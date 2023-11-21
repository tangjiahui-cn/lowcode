import { useEffect, useMemo, useRef, useState } from 'react';
import { useWrapBox } from '../../../hooks/useWrapBox';
import * as React from 'react';
import { DRAG, ERROR, EVENT } from '../../../enum';
import { useOperateBox } from '../../../hooks/useOperateBox';
import OperateBox from '../../../components-sys/OperateBox';
import { throttle } from 'lodash';
import { useUpdateEffect } from 'ahooks';
import { img } from '../../index';
import {
  engine,
  Instance,
  ExposeRule,
  StyleProcessorData,
  TriggerRule,
  useRegisterJsonNode,
  RegisterComponent,
  JsonNode,
  createJsonNode,
  getComponentByCId,
  ContainerChildren,
  // ContainerChildrenItem,
} from '../../../core';

const notifyScroll = throttle((payload) => {
  engine.globalEvent.notify(EVENT.SCROLL, payload);
}, engine.globalVar.eventThrottleDelay);

interface IProps {
  jsonNode: JsonNode;
  parentJsonNode?: JsonNode;
}

/**
 * 渲染 JsonNode 节点
 *
 * At 2023/11/01
 * By TangJiaHui
 */
// 父jsonNode （仅用于节点拖拽时赋值）
let _parentJsonNode: JsonNode | undefined;
export default function RenderJsonNode(props: IProps) {
  const { jsonNode } = props;
  const isPreview = engine.globalVar.isPreview();

  // 记录拖拽时经过组件的size信息
  const sizeInfo = useRef<DOMRect>();

  // 取消挂载当前实例事件规则的函数
  const unRegisterExposeRuleFn = useRef<() => void>();
  const unRegisterTriggerRuleFn = useRef<() => void>();

  // 获取元素DOM节点
  const getTargetDomRef = useRef<() => any>();
  // 当前实例
  const instanceRef = useRef<Instance>();

  // 当前jsonNode对应组件
  const component: RegisterComponent = useMemo(() => {
    return getComponentByCId(jsonNode?.cId);
  }, [jsonNode?.cId]);

  // 属性值
  const [attributes, setAttributes] = useState<any>(props?.jsonNode.attributes);

  // 设置预处理样式
  const [styleData, setStyleData] = useState<StyleProcessorData | undefined>(
    props?.jsonNode?.styleData,
  );

  const commonOptions = {
    getContainerFn: () => engine.panel.editor.domRef?.current,
    getChildFn: () => getTargetDomRef?.current?.(),
  };

  // TODO: 修改wrap-box的方式
  const focusPanelRef = useWrapBox(
    {
      style: {
        background: 'transparent',
        border: '2px solid blue',
        boxSizing: 'border-box',
        pointerEvents: 'none',
      },
      ...commonOptions,
    },
    [attributes, styleData],
  );

  const hoverPanelRef = useWrapBox({
    style: {
      background: 'transparent',
      border: '1px dashed blue',
      boxSizing: 'border-box',
      pointerEvents: 'none',
    },
    ...commonOptions,
  });

  const operateBoxRef = useOperateBox({
    ...commonOptions,
    children: (
      <OperateBox
        jsonNode={props?.jsonNode}
        show={{
          showDrag: !props?.jsonNode?.isPage,
          showSelectParent: !!props?.parentJsonNode,
          showDelete: !props?.jsonNode?.isPage,
        }}
        onDragEnd={() => {
          engine.runtime.clearDragJsonNode();
          _parentJsonNode = undefined;

          engine.runtime.unShowWrap?.();
        }}
        onDragStart={(e) => {
          engine.runtime.setDragJsonNode(props?.jsonNode);
          _parentJsonNode = props?.parentJsonNode;
          handleDragStart(e);
        }}
        onDelete={() => handleDelete(props?.jsonNode?.id)}
        onSelectParent={() => handleSelectParent()}
      />
    ),
  });

  function handleDelete(id: string) {
    if (!props?.parentJsonNode?.children?.length) return;
    // 父节点删除当前节点
    props.parentJsonNode.children = props.parentJsonNode.children.filter(
      (jsonNode) => jsonNode.id !== id,
    );

    // 刷新json
    engine.json.updateJsonNode(props.parentJsonNode);
    engine.panel.editor.refreshJson();
    engine.globalEvent.notify(EVENT.SELECTED_COMPONENT, undefined);
    engine.globalEvent.notify(EVENT.JSON_EDITOR, engine.json.getJson());
  }

  function handleSelectParent() {
    if (!props?.parentJsonNode) return;
    engine.instance.getInstance(props?.parentJsonNode?.id)?.handleSelect?.();
  }

  function handleDragStart(e: React.DragEvent<HTMLSpanElement>) {
    e.dataTransfer.setDragImage(img, 0, 0);
    e.dataTransfer.setData(
      DRAG.MOVE,
      JSON.stringify({
        jsonNode: props?.jsonNode,
        parentJsonNode: props?.parentJsonNode,
      }),
    );
  }

  // 插入一个新的节点
  function insertNewNode(newJsonNode: JsonNode) {
    const component = engine.component.getComponent(newJsonNode?.cId);
    if (!component) {
      throw new Error(ERROR.NOT_FOUND_COMPONENT);
    }
    const jsonNode = createJsonNode(component);
    if (!props?.jsonNode?.children) {
      props.jsonNode.children = [];
    }
    props?.jsonNode?.children?.push?.(jsonNode);
    engine.panel.editor.refreshJson();
    // 选中拖拽节点
    setTimeout(() => {
      engine.instance.getInstance(jsonNode?.id)?.handleSelect?.();
    });
  }

  // 移动节点
  function moveNode(moveData: { jsonNode: JsonNode; parentJsonNode: JsonNode }) {
    const { jsonNode: moveJsonNode } = moveData;
    // const targetId = engine.runtime.getInsertTargetId();

    // // 如果插入自己的前面，则不用移动
    // if (!targetId || targetId === moveData.jsonNode?.id) {
    //   return;
    // }

    if (
      !moveJsonNode ||
      // 移动容器到自身，取消
      moveJsonNode?.id === props?.jsonNode.id
    ) {
      return;
    }

    // 从json数组中删除上一个拖拽节点
    if (!_parentJsonNode) {
      throw new Error('_parentJsonNode is not correctly set.');
    }

    _parentJsonNode.children = _parentJsonNode.children?.filter((jsonNode) => {
      return jsonNode.id !== moveJsonNode.id;
    });

    // 清空所有选中节点
    engine.selectedInstance.clear();

    // 拖拽节点放在当前节点下
    if (props?.jsonNode?.children) {
      // // 判断新插入位置
      // const children: JsonNode[] = [];
      // // 在children中插入移动的json节点
      // props.jsonNode.children.forEach((x) => {
      //   if (x.id === targetId) {
      //     children.push(moveJsonNode);
      //   }
      //   children.push(x);
      // });
      // props.jsonNode.children = children;
      props?.jsonNode?.children?.push(moveJsonNode);
    } else {
      props.jsonNode.children = [moveJsonNode];
    }

    // 刷新json列表
    engine.panel.editor.refreshJson();

    // 重置父节点缓存
    _parentJsonNode = undefined;

    // 选中拖拽节点
    setTimeout(() => {
      engine.instance.getInstance(moveJsonNode?.id)?.handleSelect?.();
    });
    engine.globalEvent.notify(EVENT.JSON_EDITOR, engine.json.getJson());
  }

  // 搜集拖拽时需要判断组件的大小和位置信息
  function collectSizeInfo() {
    const info: ContainerChildren = [];
    if (props?.jsonNode?.isContainer) {
      props?.jsonNode?.children?.forEach((jsonNode) => {
        info.push({
          id: jsonNode?.id,
          info: engine.instance.getInstance(jsonNode.id)?.getBoundingClientRect?.(),
        });
      });
    }
    engine.runtime.setDragOnContainerChildren(info);
  }

  // // 判断鼠标插入位置（暂时只判断了左右两个方向）
  // function judgeInsertPosition(e: React.DragEvent) {
  //   const { x: sx = 0 } = e.nativeEvent;
  //   const containerChildren = engine.runtime.getDragOnContainerChildren();
  //   let minDX = 0;
  //   let id: string | undefined = undefined;
  //   let info: DOMRect | undefined = undefined;
  //   containerChildren?.forEach((item: ContainerChildrenItem) => {
  //     const { x = 0, right = 0 } = item?.info || {};
  //     const deltaX = x - sx;
  //
  //     if (deltaX > 0) {
  //       if (!id || deltaX < minDX) {
  //         minDX = deltaX;
  //         id = item?.id;
  //         info = item?.info;
  //       }
  //     } else {
  //       const rightDeltaX = right - sx;
  //       if (rightDeltaX < 0) return;
  //       if (!id || rightDeltaX < minDX) {
  //         minDX = rightDeltaX;
  //         id = item?.id;
  //         info = item?.info;
  //       }
  //     }
  //   });
  //
  //   engine.runtime.showWrap?.(info);
  //   if (id) {
  //     engine.runtime.setInsertTargetId(id);
  //   }
  // }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    const newData = e.dataTransfer.getData(DRAG.NEW);

    if (engine.selectedInstance.isSelected?.(props?.jsonNode?.id)) {
      setTimeout(() => {
        focusPanelRef.current.resize();
      });
    }

    // 新建一个实例
    if (newData) {
      insertNewNode(JSON.parse(newData));
      return;
    }

    // 组件间移动
    const moveData = e.dataTransfer.getData(DRAG.MOVE);
    if (moveData) {
      moveNode(JSON.parse(moveData || '{}'));
    }
  }

  function getInstance(): Instance {
    return {
      id: props?.jsonNode?.id,
      name: props?.jsonNode?.name,
      getBoundingClientRect() {
        return (getTargetDomRef?.current?.() as any)?.getBoundingClientRect?.();
      },
      handleHover() {
        // 挂载wrap-box
        hoverPanelRef.current.mount();
      },
      handleUnHover() {
        // 取消挂载wrap-box
        hoverPanelRef.current.remove();
      },
      handleSelect() {
        // 取消上一个选中元素，并设置新的选中元素
        engine.selectedInstance.get()?.handleUnSelect?.();
        engine.selectedInstance.set(instanceRef.current);
        // 挂载wrap-box
        focusPanelRef?.current?.mount();
        operateBoxRef?.current?.mount();
        engine.globalEvent.notify(EVENT.SELECTED_COMPONENT, props?.jsonNode);
      },
      handleUnSelect() {
        // 取消挂载wrap-box
        focusPanelRef?.current?.remove();
        operateBoxRef?.current?.remove();
      },
      handleSetAttributes(attributes: any) {
        setAttributes(attributes);
        if (props?.jsonNode) {
          props.jsonNode.attributes = attributes;
          // 只更新json中某个节点（不更新整个组件树）
          engine.json.updateJsonNode(props?.jsonNode);
          // 更新json编辑器
          engine.globalEvent.notify(EVENT.JSON_EDITOR, engine.json.getJson());
        }
      },
      handleSetStyleData(styleData?: StyleProcessorData) {
        if (!props?.jsonNode) return;
        setStyleData(styleData);
        props.jsonNode.styleData = styleData;
        engine.json?.updateJsonNode(props?.jsonNode);
        // 更新json编辑器
        engine.globalEvent.notify(EVENT.JSON_EDITOR, engine.json.getJson());
      },
      handleSetExposeAttributes(exposeRules: ExposeRule[]) {
        if (props?.jsonNode) {
          // 先取消挂载之前的暴露规则，再重置jsonNode的暴露规则（顺序不要搞反，否则取消的是新的暴露规则）
          unRegisterExposeRuleFn.current?.();
          props.jsonNode.exposeRules = exposeRules;
          unRegisterExposeRuleFn.current = registerExposeRules(props?.jsonNode);
          // 只更新json中某个节点（不更新整个组件树）
          engine.json.updateJsonNode(props?.jsonNode);
          // 更新json编辑器
          engine.globalEvent.notify(EVENT.JSON_EDITOR, engine.json.getJson());
        }
      },
      handleSetTriggerAttributes(triggerRules: TriggerRule[]) {
        if (props?.jsonNode) {
          unRegisterTriggerRuleFn.current?.();
          props.jsonNode.triggerRules = triggerRules;
          unRegisterTriggerRuleFn.current = registerTriggerRules(props?.jsonNode);
          // 只更新json中某个节点（不更新整个组件树）
          engine.json.updateJsonNode(props?.jsonNode);
          // 更新json编辑器
          engine.globalEvent.notify(EVENT.JSON_EDITOR, engine.json.getJson());
        }
      },
      getExposeAttributes(): ExposeRule[] {
        return props?.jsonNode?.exposeRules || [];
      },
    };
  }

  // 注册暴露事件规则
  function registerExposeRules(jsonNode: JsonNode) {
    jsonNode?.exposeRules?.forEach((exposeRule) => {
      engine.event.addExposeRule(exposeRule);
    });
    return () => {
      jsonNode?.exposeRules?.forEach((exposeRule) => {
        engine.event.removeExposeRule(exposeRule);
      });
    };
  }

  // 注册触发事件规则
  function registerTriggerRules(jsonNode: JsonNode) {
    jsonNode?.triggerRules?.forEach((exposeRule) => {
      engine.event.addTriggerRule(exposeRule);
    });
    return () => {
      jsonNode?.triggerRules?.forEach((exposeRule) => {
        engine.event.removeTriggerRule(exposeRule);
      });
    };
  }

  useRegisterJsonNode(props?.jsonNode);

  useEffect(() => {
    instanceRef.current = getInstance();
    engine.instance.add(instanceRef.current); // 注册当前实例
    // 注册事件规则
    unRegisterExposeRuleFn.current = registerExposeRules(props?.jsonNode);
    unRegisterTriggerRuleFn.current = registerTriggerRules(props?.jsonNode);

    return () => {
      engine.instance.delete(instanceRef.current?.id);
      // 取消挂载事件规则
      unRegisterExposeRuleFn.current?.();
      unRegisterTriggerRuleFn.current?.();
    };
  }, [props?.jsonNode]);

  useUpdateEffect(() => {
    setAttributes(props?.jsonNode?.attributes);
    setStyleData(props?.jsonNode?.styleData);

    // 节点更新时，更新属性面板
    if (engine.selectedInstance.isSelected(props?.jsonNode?.id)) {
      engine.globalEvent.notify(EVENT.SELECTED_COMPONENT, props?.jsonNode);
    }
  }, [props?.jsonNode]);

  // 开启预览模式，清空状态
  useUpdateEffect(() => {
    if (isPreview) {
      focusPanelRef.current.remove();
      hoverPanelRef.current.remove();
      operateBoxRef.current.remove();
      engine.selectedInstance.clear();
      engine.hoverInstanceStack.clear();
      engine.globalEvent.notify(EVENT.SELECTED_COMPONENT, undefined);
    }
  }, [isPreview]);

  return (
    <component.template
      id={props?.jsonNode?.id}
      getDomFn={(fn: any) => (getTargetDomRef.current = fn)}
      attributes={attributes}
      styleData={styleData}
      events={
        isPreview
          ? undefined
          : {
              onScroll(event: any) {
                notifyScroll({ event, jsonNode: props?.jsonNode });
              },
              onPointerDown(e: any) {
                e.preventDefault();
                e.stopPropagation();
                // 不能重复选中同一个元素
                if (engine.selectedInstance.isSelected(instanceRef.current?.id)) {
                  return;
                }
                // 新的选中元素操作
                instanceRef.current?.handleSelect?.();
              },
              onPointerEnter() {
                // 旧的栈顶元素取消经过
                engine.hoverInstanceStack.getStackTop()?.handleUnHover?.();
                // 插入新的栈顶元素，并经过
                instanceRef.current?.handleHover?.();
                engine.hoverInstanceStack?.push(instanceRef?.current);
              },
              onPointerLeave() {
                // 弹出栈顶元素，取消经过
                engine.hoverInstanceStack.pop()?.handleUnHover();
                // 新的栈顶元素经过
                engine.hoverInstanceStack.getStackTop()?.handleHover();
              },
              onDragEnter(e: any) {
                sizeInfo.current = getTargetDomRef.current?.()?.getBoundingClientRect();

                // 不能拖拽节点到自身
                if (engine.runtime.isDragJsonNode(props?.jsonNode?.id)) {
                  return;
                }

                instanceRef?.current?.handleHover?.();
                // 进入组件时：
                // * 如果是容器类组件，则计算所有儿子元素的大小位置信息
                // * 如果是废容器类组件，则计算当前组件的的大小位置信息
                collectSizeInfo();

                e.stopPropagation();
                e.preventDefault();
              },
              onDragLeave(e: any) {
                instanceRef.current?.handleUnHover?.();
                e.stopPropagation();
                e.preventDefault();
              },
              onDragOver(e: React.DragEvent) {
                // 不能拖拽节点到自身
                if (engine.runtime.isDragJsonNode(props?.jsonNode?.id)) {
                  return;
                }
                // // 经过容器节点是，对节点进行插入位置判断
                // if (props?.jsonNode?.isContainer) {
                //   judgeInsertPosition(e);
                // }
                e.preventDefault();
                e.stopPropagation();
              },
              onDrop(e: any) {
                engine.runtime.unShowWrap?.();
                e.stopPropagation();
                // 仅容器节点可以放置其他元素
                if (!props?.jsonNode?.isContainer) return;
                handleDrop(e);
              },
            }
      }
    >
      {props?.jsonNode?.children?.map?.((child) => {
        return (
          <RenderJsonNode
            key={child.id}
            jsonNode={Object.assign(child, {
              parentId: props?.jsonNode?.id,
            })}
            parentJsonNode={props?.jsonNode}
          />
        );
      })}
    </component.template>
  );
}
