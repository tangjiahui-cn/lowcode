import {
  currentComponents,
  currentInstances,
  Instance,
  JsonNode,
  RegisterComponent,
  currentPanels,
  globalEvent,
  globalVariable,
  currentJson,
  ExposeEvent,
  TriggerEvent,
} from '../../../data';
import { useEffect, useMemo, useRef, useState } from 'react';
import { createJsonNode, getComponentByCId } from '../../../utils';
import { currentSelectedInstance } from '../../../data/currentSelectedInstance';
import { useWrapBox } from '../../../hooks/useWrapBox';
import * as React from 'react';
import { DRAG, ERROR, EVENT } from '../../../enum';
import { currentHoverInstanceStack } from '../../../data/currentHoverInstanceStack';
import { useOperateBox } from '../../../hooks/useOperateBox';
import OperateBox from '../../../components-sys/OperateBox';
import { throttle } from 'lodash';
import { useUpdateEffect } from 'ahooks';
import { img } from '../../index';
import { globalEventSystem } from '../../../data/globalEventSystem';
import { currentRegisterEvent } from '../../../data/currentRegisterEvent';

const notifyScroll = throttle((payload) => {
  globalEvent.notify(EVENT, payload);
}, globalVariable.eventThrottleDelay);

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
  const isPreview = globalVariable.isPreview();

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

  const commonOptions = {
    getContainerFn: () => currentPanels.editor.domRef?.current,
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
    [attributes],
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
        show={{
          showDrag: !props?.jsonNode?.isPage,
          showSelectParent: !!props?.parentJsonNode,
          showDelete: !props?.jsonNode?.isPage,
        }}
        onDragEnd={() => (_parentJsonNode = undefined)}
        onDragStart={(e) => {
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
    currentJson.updateJsonNode(props.parentJsonNode);
    currentPanels.editor.refreshJson();
    globalEvent.notify(EVENT.SELECTED_COMPONENT, undefined);
    globalEvent.notify(EVENT.JSON_EDITOR, currentJson.getJson());
  }

  function handleSelectParent() {
    if (!props?.parentJsonNode) return;
    currentInstances.getIns(props?.parentJsonNode?.id)?.handleSelect?.();
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
    const component = currentComponents.getComponent(newJsonNode?.cId);
    if (!component) {
      throw new Error(ERROR.NOT_FOUND_COMPONENT);
    }
    const jsonNode = createJsonNode(component);
    if (!props?.jsonNode?.children) {
      props.jsonNode.children = [];
    }
    props?.jsonNode?.children?.push?.(jsonNode);
    currentPanels.editor.refreshJson();
    // 选中拖拽节点
    setTimeout(() => {
      currentInstances.getIns(jsonNode?.id)?.handleSelect?.();
    });
  }

  // 移动节点
  function moveNode(moveData: { jsonNode: JsonNode; parentJsonNode: JsonNode }) {
    const { jsonNode: moveJsonNode, parentJsonNode: moveParentNode } = moveData;

    if (
      !moveJsonNode ||
      // 移动容器到自身，取消
      moveJsonNode?.id === props?.jsonNode.id ||
      // 在同一个容器内移动
      moveParentNode?.id === props?.jsonNode?.id
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
    currentSelectedInstance.clear();

    // 拖拽节点放在当前节点下
    props?.jsonNode?.children
      ? props?.jsonNode?.children?.push(moveJsonNode)
      : (props.jsonNode.children = [moveJsonNode]);

    // 刷新json列表
    currentPanels.editor.refreshJson();

    // 重置父节点缓存
    _parentJsonNode = undefined;

    // 选中拖拽节点
    setTimeout(() => {
      currentInstances.getIns(moveJsonNode?.id)?.handleSelect?.();
    });
    globalEvent.notify(EVENT.JSON_EDITOR, currentJson.getJson());
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    const newData = e.dataTransfer.getData(DRAG.NEW);

    if (currentSelectedInstance.isSelected?.(props?.jsonNode?.id)) {
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
        currentSelectedInstance.get()?.handleUnSelect?.();
        currentSelectedInstance.set(instanceRef.current);
        // 挂载wrap-box
        focusPanelRef?.current?.mount();
        operateBoxRef?.current?.mount();
        globalEvent.notify(EVENT.SELECTED_COMPONENT, props?.jsonNode);
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
          currentJson.updateJsonNode(props?.jsonNode);
          // 更新json编辑器
          globalEvent.notify(EVENT.JSON_EDITOR, currentJson.getJson());
        }
      },
      handleSetExposeAttributes(exposeEvents: ExposeEvent[]) {
        if (props?.jsonNode) {
          props.jsonNode.exposes = exposeEvents;
          // 只更新json中某个节点（不更新整个组件树）
          currentJson.updateJsonNode(props?.jsonNode);
          // 更新json编辑器
          globalEvent.notify(EVENT.JSON_EDITOR, currentJson.getJson());
        }
      },
      handleSetTriggerAttributes(triggerEvent: TriggerEvent[]) {
        if (props?.jsonNode) {
          props.jsonNode.triggers = triggerEvent;
          // 只更新json中某个节点（不更新整个组件树）
          currentJson.updateJsonNode(props?.jsonNode);
          // 更新json编辑器
          globalEvent.notify(EVENT.JSON_EDITOR, currentJson.getJson());
        }
      },
      getExposeAttributes() {
        return props?.jsonNode?.exposes || [];
      },
    };
  }

  // 注册事件
  function registerEvents(): () => void {
    // 取消注册的函数列表
    const unRegisterFns: any[] = [];

    // 暴露事件（供外界调用, 这里已经在组件内部监听了，此处只是注册下以供触发事件根据uId查询对应暴露事件）
    props?.jsonNode?.exposes?.forEach((exposeEvent: ExposeEvent) => {
      currentRegisterEvent.add(exposeEvent.uId, exposeEvent);
      unRegisterFns.push(() => {
        currentRegisterEvent.remove(exposeEvent.uId);
      });
    });

    // 触发事件(监听当前实例的事件变更通知，并发布新的变更到暴露组件)
    props?.jsonNode?.triggers?.forEach((trigger: TriggerEvent) => {
      function callback() {
        const targetEvent: ExposeEvent | undefined = currentRegisterEvent.get(trigger?.targetUId);
        if (targetEvent) {
          globalEventSystem.notify(targetEvent.id, targetEvent.eId, '111');
        }
      }

      currentRegisterEvent.add(trigger.uId, trigger);
      globalEventSystem.on(props?.jsonNode?.id, trigger?.eId, callback);
      unRegisterFns.push(() => {
        currentRegisterEvent.remove(trigger.uId);
        globalEventSystem.remove(props?.jsonNode?.id, trigger?.eId, callback);
      });
    });

    return () => unRegisterFns.forEach((fn) => fn?.());
  }

  useEffect(() => {
    const unRegisterFn = registerEvents(); // 注册事件系统
    instanceRef.current = getInstance();
    currentInstances.add(instanceRef.current); // 注册当前实例
    return () => {
      unRegisterFn();
      currentInstances.delete(instanceRef.current?.id);
    };
  }, [props?.jsonNode]);

  useUpdateEffect(() => {
    setAttributes(props?.jsonNode?.attributes);

    // 节点更新时，更新属性面板
    if (currentSelectedInstance.isSelected(props?.jsonNode?.id)) {
      globalEvent.notify(EVENT.SELECTED_COMPONENT, props?.jsonNode);
    }
  }, [props?.jsonNode?.attributes]);

  // 开启预览模式，清空状态
  useUpdateEffect(() => {
    if (isPreview) {
      focusPanelRef.current.remove();
      hoverPanelRef.current.remove();
      operateBoxRef.current.remove();
      currentSelectedInstance.clear();
      currentHoverInstanceStack.clear();
      globalEvent.notify(EVENT.SELECTED_COMPONENT, undefined);
    }
  }, [isPreview]);

  return (
    <component.template
      id={props?.jsonNode?.id}
      getDomFn={(fn: any) => (getTargetDomRef.current = fn)}
      attributes={attributes}
      style={{
        cursor: 'default',
        ...component.defaultStyle,
      }}
      events={
        isPreview
          ? undefined
          : {
              onScroll(event) {
                notifyScroll({ event, jsonNode: props?.jsonNode });
              },
              onPointerDown(e) {
                e.preventDefault();
                e.stopPropagation();
                // 不能重复选中同一个元素
                if (currentSelectedInstance.isSelected(instanceRef.current?.id)) {
                  return;
                }
                // 新的选中元素操作
                instanceRef.current?.handleSelect?.();
              },
              onPointerEnter() {
                // 旧的栈顶元素取消经过
                currentHoverInstanceStack.getStackTop()?.handleUnHover?.();
                // 插入新的栈顶元素，并经过
                instanceRef.current?.handleHover?.();
                currentHoverInstanceStack?.push(instanceRef?.current);
              },
              onPointerLeave() {
                // 弹出栈顶元素，取消经过
                currentHoverInstanceStack.pop()?.handleUnHover();
                // 新的栈顶元素经过
                currentHoverInstanceStack.getStackTop()?.handleHover();
              },
              onDragOver(e) {
                e.preventDefault();
                e.stopPropagation();
              },
              onDrop(e) {
                e.stopPropagation();
                // 仅容器节点可以放置其他元素
                if (!props?.jsonNode?.isContainer) return;
                handleDrop(e);
              },
            }
      }
    >
      {props?.jsonNode?.children?.map?.((child) => {
        return <RenderJsonNode key={child.id} jsonNode={child} parentJsonNode={props?.jsonNode} />;
      })}
    </component.template>
  );
}
