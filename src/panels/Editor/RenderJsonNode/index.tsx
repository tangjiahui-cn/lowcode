/**
 * 渲染JsonNode节点
 *
 * At 2023/12/10
 * By TangJiaHui
 */
import {
  Component,
  createJsonNode,
  engine,
  EVENT,
  JsonNode,
  useListenState,
  useRegisterInstance,
  useRegisterJsonNode,
  useWrapBox,
} from '@/core';
import React, { useMemo, useRef } from 'react';
import { COMPONENT_KEY } from '@/core/api/component';

interface RenderJsonNodeProps {
  jsonNode: JsonNode;
}

export default function RenderJsonNode(props: RenderJsonNodeProps) {
  const [jsonNode, setJsonNode] = useListenState(props?.jsonNode);
  const getDomRef = useRef<() => any>();

  const hoverBox = useWrapBox({
    getContainer: engine.panel.getEditorDom,
    getTarget: () => getDomRef.current?.(),
  });

  const focusBox = useWrapBox({
    getContainer: engine.panel.getEditorDom,
    getTarget: () => getDomRef.current?.(),
    style: {
      border: '2px solid blue',
    },
  });

  // 注册JsonNode
  useRegisterJsonNode(props.jsonNode);

  // 注册实例
  const instanceRef = useRegisterInstance(() => {
    return {
      id: props?.jsonNode?.id,
      handleSelect() {
        // 不可重复选中
        if (engine.selectedInstance.isSelected(instanceRef.current?.id)) {
          return;
        }
        // 取消上一个选中元素，并设置新的选中元素
        engine.selectedInstance.get()?.handleUnSelect?.();
        engine.selectedInstance.set(instanceRef.current);
        focusBox.current.show();
      },
      handleUnSelect() {
        focusBox.current.hide();
      },
      handleHover() {
        hoverBox.current.show();
      },
      handleUnHover() {
        hoverBox.current.hide();
      },
      // 局部更新JsonNode
      scopeUpdate,
    };
  }, [props?.jsonNode]);

  // 组件模板
  const component: Component | undefined = useMemo(
    () => engine.component.get(props?.jsonNode?.cId),
    [props?.jsonNode],
  );

  function handleDrop(e: React.DragEvent<any>) {
    // 如果当前实例可以存放子元素，则放置
    if (component?.isChildren) {
      e.stopPropagation();
    }

    const dragNewData = JSON.parse(e.dataTransfer.getData(COMPONENT_KEY.DRAG_NEW) || '{}');
    add(dragNewData);
  }

  // 在当前组件下新增一个组件
  function add(dragData: { cId?: string }) {
    const component = engine.component.get(dragData?.cId);
    if (!component) {
      throw Error(`component is not exist which cId is: ${dragData?.cId}`);
    }

    // 当前jsonNode下附加节点
    scopeUpdate({
      ...jsonNode,
      children: [...(jsonNode?.children || []), createJsonNode(component)],
    });
  }

  // 更新当前节点
  function scopeUpdate(jsonNode: JsonNode) {
    // 局部更新
    setJsonNode(jsonNode);
    // 同步更新全局JsonNode
    engine.jsonNode.update(jsonNode.id, jsonNode);
  }

  return (
    component?.template && (
      <component.template
        id={jsonNode?.id}
        getDomFn={(fn) => (getDomRef.current = fn)}
        events={{
          onDragOver(e) {
            e.preventDefault();
          },
          onDrop(e) {
            handleDrop(e);
          },
          onScroll() {
            engine.event.notify(EVENT.scroll);
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
        }}
      >
        {jsonNode?.children?.map((child) => {
          return <RenderJsonNode jsonNode={child} key={child?.id} />;
        })}
      </component.template>
    )
  );
}
