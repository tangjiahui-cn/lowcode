import {
  currentComponents,
  currentInstances,
  Instance,
  JsonNode,
  RegisterComponent,
  currentPanels, globalEvent, globalVariable,
} from "../../../data";
import {useEffect, useMemo, useRef, useState} from "react";
import {createJsonNode, getComponentByCId} from "../../../utils";
import {currentSelectedInstance} from "../../../data/currentSelectedInstance";
import {useWrapBox} from "../../../hooks/useWrapBox";
import * as React from "react";
import {DRAG, ERROR, EVENT} from "../../../enum";
import {currentHoverInstanceStack} from "../../../data/currentHoverInstanceStack";
import {useOperateBox} from "../../../hooks/useOperateBox";
import OperateBox from "../../../components-sys/OperateBox";
import {throttle} from "lodash";

const notifyScroll = throttle((payload) => {
  globalEvent.notify(EVENT, payload)
}, globalVariable.eventThrottleDelay)

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
export default function RenderJsonNode (props: IProps) {
  const {jsonNode} = props;

  // 获取元素DOM节点
  const getTargetDomRef = useRef<() => any>();
  // 实例
  const instanceRef = useRef<Instance>(getInstance());

  const component: RegisterComponent = useMemo(() => {
    return getComponentByCId(jsonNode?.cId)
  }, [jsonNode?.cId])

  // 属性值
  const [attributes, setAttributes] = useState<any>(props?.jsonNode.attributes);

  const commonOptions = {
    getContainerFn: () => currentPanels.editor.domRef?.current,
    getChildFn: () => getTargetDomRef?.current?.()
  }

  // TODO: 修改wrap-box的方式
  const focusPanelRef = useWrapBox({
    style: {
      background: 'transparent',
      border: '2px solid blue',
      boxSizing: 'border-box',
      pointerEvents: 'none'
    },
    ...commonOptions
  }, [attributes])

  const hoverPanelRef = useWrapBox({
    style: {
      background: 'transparent',
      border: '1px dashed blue',
      boxSizing: 'border-box',
      pointerEvents: 'none'
    },
    ...commonOptions
  })

  const operateBoxRef = useOperateBox({
    ...commonOptions,
    children: <OperateBox
      onDelete={() => handleDelete(props?.jsonNode?.id)}
      onSelectParent={() => handleSelectParent()}
    />
  })

  function handleDelete (id: string) {
    if (!props?.parentJsonNode?.children?.length) return;
    // 父节点删除当前节点
    props.parentJsonNode.children = props.parentJsonNode.children.filter(jsonNode => jsonNode.id !== id)
    // 刷新json
    currentPanels.editor.refreshJson();
  }

  function handleSelectParent () {
    if (!props?.parentJsonNode) return;
    // 当前节点取消选中
    instanceRef.current.handleUnSelect();
    // 父节点选中
    currentInstances.getIns(props?.parentJsonNode?.id)?.handleSelect?.();
  }

  function handleDrop (e: React.DragEvent<HTMLDivElement>) {
    const newData = e.dataTransfer.getData(DRAG.NEW);

    if (currentSelectedInstance.isSelected?.(props?.jsonNode?.id)) {
      setTimeout(() => {
        focusPanelRef.current.resize();
      })
    }

    // 新建一个实例
    if (newData) {
      const {cId} = JSON.parse(newData)
      const component = currentComponents.getComponent(cId);
      if (!component) {
        throw new Error(ERROR.NOT_FOUND_COMPONENT)
      }
      const jsonNode = createJsonNode(component);
      if (!props?.jsonNode?.children) {
        props.jsonNode.children = []
      }
      props?.jsonNode?.children?.push?.(jsonNode);
      currentPanels.editor.refreshJson();
    }
  }

  function getInstance () : Instance {
    return {
      id: props?.jsonNode?.id,
      handleHover () {
        // 挂载wrap-box
        hoverPanelRef.current.mount()
      },
      handleUnHover() {
        // 取消挂载wrap-box
        hoverPanelRef.current.remove()
      },
      handleSelect () {
        // 挂载wrap-box
        focusPanelRef?.current?.mount()
        operateBoxRef?.current?.mount()
        globalEvent.notify(EVENT.SELECTED_COMPONENT, props?.jsonNode)
      },
      handleUnSelect () {
        // 取消挂载wrap-box
        focusPanelRef?.current?.remove()
        operateBoxRef?.current?.remove()
      },
      handleSetAttributes (attributes: any) {
        setAttributes(attributes)
        if (props?.jsonNode) {
          props.jsonNode.attributes = attributes;
        }
      }
    }
  }

  useEffect(() => {
    currentInstances.add(instanceRef.current);
    return () => currentInstances.delete(instanceRef.current.id);
  }, [])

  return (
    <component.template
      getDomFn={(fn: any) => getTargetDomRef.current = fn}
      attributes={attributes}
      style={{
        cursor: 'default',
        ...component.defaultStyle
      }}
      events={{
        onScroll (event) {
          notifyScroll({event, jsonNode: props?.jsonNode})
        },
        onPointerDown (e) {
          e.preventDefault();
          e.stopPropagation();
          // 不能重复选中同一个元素
          if (currentSelectedInstance.isSelected(instanceRef.current?.id)) {
            return;
          }
          // 取消上一个选中元素
          currentSelectedInstance.get()?.handleUnSelect?.();
          // 设置新的选中元素
          currentSelectedInstance.set(instanceRef.current);
          // 新的选中元素操作
          instanceRef.current.handleSelect();
        },
        onPointerEnter () {
          // 旧的栈顶元素取消经过
          currentHoverInstanceStack.getStackTop()?.handleUnHover?.();
          // 插入新的栈顶元素，并经过
          instanceRef.current?.handleHover?.();
          currentHoverInstanceStack?.push(instanceRef?.current);
        },
        onPointerLeave () {
          // 弹出栈顶元素，取消经过
          currentHoverInstanceStack.pop()?.handleUnHover()
          // 新的栈顶元素经过
          currentHoverInstanceStack.getStackTop()?.handleHover()
        },
        onDragOver (e) {
          e.preventDefault()
          e.stopPropagation()
        },
        onDrop (e) {
          e.stopPropagation()
          // 仅容器节点可以放置其他元素
          if (!props?.jsonNode?.isContainer) return;
          handleDrop(e);
        }
      }}
    >
      {props?.jsonNode?.children?.map?.(child => {
        return (
          <RenderJsonNode
            key={child.id}
            jsonNode={child}
            parentJsonNode={props?.jsonNode}
          />
        )
      })}
    </component.template>
  )
}
