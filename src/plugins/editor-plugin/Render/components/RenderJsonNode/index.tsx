/**
 * 渲染JsonNode节点
 *
 * At 2023/12/10
 * By TangJiaHui
 */
import { useEffect, useRef } from 'react';
import OperateBox from '../OperateBox';
import {
  endFlow,
  startFlow,
  useListenState,
  nextTick,
  useComponent,
  useWrapBox,
  runtime,
  createJsonNode,
  Instance,
  JsonNode,
  Component,
} from '@/engine';

interface RenderJsonNodeProps {
  isCannotSelect?: boolean;
  parentId?: string;
  jsonNode: JsonNode;
}

export default function RenderJsonNode(props: RenderJsonNodeProps) {
  // 获取当前节点DOM的函数
  const getDomRef = useRef<() => any>();
  // 当前实例的jsonNode
  const [jsonNode, setJsonNode] = useListenState<JsonNode>(props?.jsonNode);
  // 对应的组件
  const component: Component | undefined = useComponent(props?.jsonNode);

  // 鼠标经过盒子
  const hoverBox = useWrapBox({
    getContainer: () => document.body,
    getTarget: () => getDomRef.current?.(),
  });

  // 鼠标聚集盒子
  const focusBox = useWrapBox({
    getContainer: () => document.body,
    getTarget: () => getDomRef.current?.(),
    style: {
      border: '2px solid blue',
    },
    operate: (
      <OperateBox
        jsonNode={jsonNode}
        show={{
          showDrag: !component?.isPage,
          showDelete: !component?.isPage,
          showSelectParent: !!props?.parentId,
        }}
        onSelectParent={() => {
          const parentInstance = runtime?.instances.get(props?.parentId);
          parentInstance?.handleSelect?.();
        }}
        onDelete={() => {
          // 从父组件中删除当前组件
          const parentInstance = runtime?.instances.get(props?.parentId);
          if (parentInstance) {
            parentInstance.jsonNode.children = parentInstance.jsonNode.children?.filter(
              (x) => x.id !== jsonNode?.id,
            );
            // 如果子元素为空，则删除children属性，减小json体积
            if (!parentInstance.jsonNode?.children?.length) {
              delete parentInstance.jsonNode?.children;
            }
            parentInstance?.scopeUpdateJsonNode?.(parentInstance.jsonNode);
            instanceRef.current?.handleUnSelect?.();
          }
        }}
        onDragStart={(e) => {
          const img = runtime?.components?.getDragImage?.(jsonNode?.cId);
          if (!img) {
            return;
          }
          e.dataTransfer.setDragImage(img, 0, 0);
          startFlow('jsonNode-move', {
            data: jsonNode,
          });

          // 待考虑
          runtime?.instances.setDragging(instanceRef.current);
        }}
        onDragEnd={() => {
          runtime?.instances.clearDragging();
        }}
      />
    ),
  });

  const instanceRef = useRef<Instance>();

  // 注册jsonNode
  useEffect(() => {
    instanceRef.current = getInstance(props?.jsonNode);
    runtime?.jsonNodes?.register?.(props?.jsonNode); // 注册jsonNode
    runtime?.instances?.register?.(getInstance(props?.jsonNode)); // 注册instance
    return () => {
      runtime?.jsonNodes?.unRegister?.(props?.jsonNode?.id);
      runtime?.instances?.unRegister?.(instanceRef.current?.id);
    };
  }, [props]);

  function getInstance(jsonNode: JsonNode) {
    const id = jsonNode?.id;
    return {
      id,
      jsonNode,
      cName: component?.cName,
      parentId: props?.parentId,
      handleSelect() {
        if (props?.isCannotSelect) {
          return;
        }
        // 不可重复选中
        if (runtime?.instances.isSelected(instanceRef.current?.id)) {
          return;
        }
        // 取消上一个选中元素，并设置新的选中元素
        runtime?.instances.getSelected()?.forEach((ins) => ins.handleUnSelect());
        runtime?.instances.setSelected(instanceRef.current ? [instanceRef.current] : []);
        focusBox.current.show();

        // 发布全局通知：选中JsonNode
        startFlow('jsonNode-select', {
          from: jsonNode?.id,
          data: jsonNode,
        });
      },
      handleUnSelect() {
        if (props?.isCannotSelect) {
          return;
        }
        runtime?.instances.clearSelected();
        focusBox.current.hide();
      },
      handleHover() {
        if (props?.isCannotSelect) {
          return;
        }
        // 当前实例非选中,才可以设置当前选中实例
        if (runtime?.instances.isNotCurrentHoverInstance(id)) {
          runtime?.instances.setCurrentHoverInstance(instanceRef.current);
        }
        hoverBox.current.show();
      },
      handleUnHover() {
        if (props?.isCannotSelect) {
          return;
        }
        // 当前实例选中,才可以清空选中实例
        if (runtime?.instances.isCurrentHoverInstance(id)) {
          runtime?.instances.clearCurrentHoverInstance();
        }
        hoverBox.current.hide();
      },
      // 局部更新JsonNode
      scopeUpdateJsonNode(target: JsonNode) {
        // 更新当前实例内容
        setJsonNode({ ...target });

        // 同步更新全局JsonNode
        runtime?.jsonNodes?.update?.(target.id, target);

        // 更新wrapBox位置
        nextTick(focusBox.current.resize);
      },
    };
  }

  // // 注册绑定事件
  // useRegisterEvents(props?.jsonNode);

  // 在当前组件下新增一个组件
  function add(cId: string) {
    const component = runtime?.components.get(cId);
    if (!component) {
      throw Error(`component is not exist which cId is: ${cId}`);
    }

    // 在当前jsonNode下附加节点
    instanceRef.current?.scopeUpdateJsonNode?.({
      ...jsonNode,
      children: [...(jsonNode?.children || []), createJsonNode(component)],
    });
  }

  // 移动组件
  function move(srcJsonNode: JsonNode) {
    const moveJsonInstance: Instance | undefined = runtime?.instances.get(srcJsonNode?.id);
    const moveJsonNodeParent = runtime?.instances.getParentJsonNode(srcJsonNode.id);
    const moveInstanceParent = runtime?.instances.getParent(srcJsonNode.id);

    // 如果移动节点的父容器不存在，则取消移动（几乎不会遇到这种情况，但保险起见做一个边界判断）
    if (!moveJsonNodeParent) {
      return;
    }

    // 父容器节点删除移动节点
    moveJsonNodeParent.children = moveJsonNodeParent?.children?.filter(
      (x) => x.id !== srcJsonNode.id,
    );
    !moveJsonNodeParent.children?.length && delete moveJsonNodeParent.children;
    moveInstanceParent?.scopeUpdateJsonNode(moveJsonNodeParent);

    // 取消移动节点的选中效果
    moveJsonInstance?.handleUnHover?.();
    moveJsonInstance?.handleUnSelect?.();

    // 当前容器节点更新
    jsonNode?.children?.length
      ? jsonNode?.children.push(srcJsonNode)
      : (jsonNode.children = [srcJsonNode]);
    instanceRef.current?.scopeUpdateJsonNode(jsonNode);

    // 拖拽完成后，重新选中节点
    nextTick(() => {
      const target = runtime?.instances.get(srcJsonNode.id);
      target?.handleSelect();
      // 清空当前经过实例
      runtime?.instances.getCurrentHoverInstance()?.handleUnHover?.();
    });
  }

  function isCanDrop() {
    return !(
      // 目标节点正在拖拽不能放置q
      (
        runtime?.instances.isDragging(jsonNode?.id) ||
        // 目标节点不支持children属性不能放置
        !component?.isChildren ||
        // 目标节点是自己的最近一级父容器节点不能放置（避免无意义操作）
        runtime?.instances.isDraggingParent(jsonNode?.id)
      )
    );
  }

  return (
    component?.template && (
      <component.template
        id={jsonNode?.id}
        styleData={jsonNode?.styleData}
        getDomFn={(fn) => (getDomRef.current = fn)}
        events={{
          onScroll() {
            startFlow('instance-scroll');
          },
          onPointerEnter() {
            // 上一个栈顶元素取消经过
            runtime?.instances.getHoverStackTop()?.handleUnHover?.();
            // 新元素推入栈并经过
            runtime?.instances.pushHoverStack(instanceRef.current);
            // 栈顶元素经过
            instanceRef.current?.handleHover?.();
          },
          onPointerLeave() {
            // 推出栈顶元素并取消经过
            runtime?.instances.popHoverStack()?.handleUnHover?.();
            // 新的栈顶元素经过
            runtime?.instances.getHoverStackTop()?.handleHover?.();
          },
          onPointerDown(e) {
            e.preventDefault();
            e.stopPropagation();
            instanceRef.current?.handleSelect?.();
          },
          onDragOver(e) {
            if (!isCanDrop()) {
              return;
            }
            e.preventDefault();
            e.stopPropagation();
          },
          onDrop(e) {
            if (!isCanDrop()) {
              return;
            }

            endFlow('jsonNode-new', (payload) => {
              add((payload?.data as Component)?.cId);
            });

            endFlow('jsonNode-move', (payload) => {
              move(payload?.data as JsonNode);
            });

            e.stopPropagation();
            e.preventDefault();
          },
          onDragEnter(e) {
            instanceRef.current?.handleHover();
            e.stopPropagation();
            e.preventDefault();
          },
          onDragLeave(e) {
            instanceRef.current?.handleUnHover();
            e.stopPropagation();
            e.preventDefault();
          },
        }}
        attributes={jsonNode?.attributes}
      >
        {jsonNode?.children?.map((child) => {
          return <RenderJsonNode parentId={jsonNode?.id} jsonNode={child} key={child?.id} />;
        })}
      </component.template>
    )
  );
}
