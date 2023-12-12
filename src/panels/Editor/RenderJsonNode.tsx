/**
 * 渲染JsonNode节点
 *
 * At 2023/12/10
 * By TangJiaHui
 */
import {
  Component,
  COMPONENT_KEY,
  createJsonNode,
  engine,
  Instance,
  JsonNode,
  nextTick,
  useComponent,
  useListenState,
  useRegisterInstance,
  useRegisterJsonNode,
  useWrapBox,
} from '@/core';
import { useRef } from 'react';
import OperateBox from './components/OperateBox';

interface RenderJsonNodeProps {
  parentId?: string;
  jsonNode: JsonNode;
}

export default function RenderJsonNode(props: RenderJsonNodeProps) {
  // 获取当前节点DOM的函数
  const getDomRef = useRef<() => any>();
  // 当前实例的jsonNode
  const [jsonNode, setJsonNode] = useListenState(props?.jsonNode);
  // 对应的组件
  const component: Component | undefined = useComponent(props?.jsonNode);

  // 鼠标经过盒子
  const hoverBox = useWrapBox({
    getContainer: engine.panel.getEditorDom,
    getTarget: () => getDomRef.current?.(),
  });

  // 鼠标聚集盒子
  const focusBox = useWrapBox({
    getContainer: engine.panel.getEditorDom,
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
          const parentInstance = engine.instance.get(props?.parentId);
          parentInstance?.handleSelect?.();
        }}
        onDelete={() => {
          // 从父组件中删除当前组件
          const parentInstance = engine.instance.get(props?.parentId);
          if (parentInstance) {
            parentInstance.jsonNode.children = parentInstance.jsonNode.children?.filter(
              (x) => x.id !== jsonNode?.id,
            );
            parentInstance?.scopeUpdateJsonNode?.(parentInstance.jsonNode);
            instanceRef.current?.handleUnSelect?.();
          }
        }}
        onDragStart={(e) => {
          const img = engine.component.getDragImage(jsonNode?.cId);
          e.dataTransfer.setDragImage(img, 0, 0);
          e.dataTransfer.setData(COMPONENT_KEY.DRAG_MOVE, JSON.stringify(jsonNode));
          engine.instance.setDragging(instanceRef.current);
        }}
        onDragEnd={() => {
          engine.instance.clearDragging();
        }}
      />
    ),
  });

  // 注册JsonNode
  useRegisterJsonNode(props.jsonNode);

  // 注册实例
  const instanceRef = useRegisterInstance(() => {
    return {
      jsonNode,
      id: props?.jsonNode?.id,
      parentId: props?.parentId,
      handleSelect() {
        // 不可重复选中
        if (engine.selectedInstance.isSelected(instanceRef.current?.id)) {
          return;
        }
        // 取消上一个选中元素，并设置新的选中元素
        engine.selectedInstance.get()?.handleUnSelect?.();
        engine.selectedInstance.set(instanceRef.current);
        engine.api.editor.selectJsonNode(jsonNode);
        focusBox.current.show();
      },
      handleUnSelect() {
        engine.selectedInstance.clear();
        focusBox.current.hide();
      },
      handleHover() {
        hoverBox.current.show();
      },
      handleUnHover() {
        hoverBox.current.hide();
      },
      // 局部更新JsonNode
      scopeUpdateJsonNode(target: JsonNode) {
        // 更新当前实例内容
        setJsonNode({ ...target });
        // 同步更新全局JsonNode
        engine.jsonNode.update(target.id, target);

        // 更新wrapBox位置
        nextTick(focusBox.current.resize);
      },
    };
  }, [jsonNode]);

  // 在当前组件下新增一个组件
  function add(dataStr: string) {
    const dragData: { cId?: string } = JSON.parse(dataStr);
    const component = engine.component.get(dragData?.cId);
    if (!component) {
      throw Error(`component is not exist which cId is: ${dragData?.cId}`);
    }

    // 在当前jsonNode下附加节点
    instanceRef.current?.scopeUpdateJsonNode?.({
      ...jsonNode,
      children: [...(jsonNode?.children || []), createJsonNode(component)],
    });
  }

  // 移动组件
  function move(dataStr: string) {
    const moveJsonNode: JsonNode = JSON.parse(dataStr);
    const moveJsonInstance: Instance | undefined = engine.instance.get(moveJsonNode?.id);
    const moveJsonNodeParent = engine.instance.getParentJsonNode(moveJsonNode.id);
    const moveInstanceParent = engine.instance.getParent(moveJsonNode.id);

    // 如果移动节点的父容器不存在，则取消移动（几乎不会遇到这种情况，但保险起见做一个边界判断）
    if (!moveJsonNodeParent) {
      return;
    }

    // 父容器节点删除移动节点
    moveJsonNodeParent.children = moveJsonNodeParent?.children?.filter(
      (x) => x.id !== moveJsonNode.id,
    );
    !moveJsonNodeParent.children?.length && delete moveJsonNodeParent.children;
    moveInstanceParent?.scopeUpdateJsonNode(moveJsonNodeParent);

    // 取消移动节点的选中效果
    moveJsonInstance?.handleUnHover?.();
    moveJsonInstance?.handleUnSelect?.();

    // 当前容器节点更新
    jsonNode?.children?.length
      ? jsonNode?.children.push(moveJsonNode)
      : (jsonNode.children = [moveJsonNode]);
    instanceRef.current?.scopeUpdateJsonNode(jsonNode);

    // 拖拽完成后，重新选中节点
    nextTick(() => {
      const target = engine.instance.get(moveJsonNode.id);
      target?.handleSelect();
    });
  }

  function isCanDrop() {
    // 目标节点正在拖拽不能放置
    if (engine.instance.isDragging(jsonNode?.id)) {
      return false;
    }

    // 目标节点不支持children属性不能放置
    if (!component?.isChildren) {
      return false;
    }

    // 目标节点是自己的最近一级父容器节点不能放置（避免无意义操作）
    if (engine.instance.isDraggingParent(jsonNode?.id)) {
      return;
    }

    return true;
  }

  return (
    component?.template && (
      <component.template
        id={jsonNode?.id}
        styleData={jsonNode?.styleData}
        getDomFn={(fn) => (getDomRef.current = fn)}
        events={{
          onScroll() {
            engine.api.editor.instanceScroll();
          },
          onPointerEnter() {
            // 上一个栈顶元素取消经过
            engine.instanceStack.getStackTop()?.handleUnHover?.();
            // 新元素推入栈并经过
            engine.instanceStack.push(instanceRef.current);
            instanceRef.current?.handleHover?.();
          },
          onPointerLeave() {
            // 推出栈顶元素并取消经过
            engine.instanceStack.pop()?.handleUnHover?.();
            // 新的栈顶元素经过
            engine.instanceStack.getStackTop()?.handleHover?.();
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

            // 新增节点
            const addDataStr = e.dataTransfer.getData(COMPONENT_KEY.DRAG_NEW);
            if (addDataStr) {
              add(addDataStr);
            }

            // 移动节点
            const moveDataStr = e.dataTransfer.getData(COMPONENT_KEY.DRAG_MOVE);
            if (moveDataStr) {
              move(moveDataStr);
            }

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
