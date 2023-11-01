import {currentComponents, RegisterComponent} from '../../data'
import {Space} from "antd";
import {container, block} from "./style";
import {img} from "../index";
import * as React from "react";
import {useEffect, useState} from "react";
import {DRAG} from "../../enum";

/**
 * 组件树面板
 *
 * At 2023/10/31
 * By TangJiaHui
 */
export default function Components () {
  const [baseComponents, setBaseComponents] = useState<RegisterComponent[]>([]);
  const [layoutComponents, setLayoutComponents] = useState<RegisterComponent[]>([]);

  function handleDragStart (e: React.DragEvent<HTMLDivElement>, component: RegisterComponent) {
    e.dataTransfer.setDragImage(img, 0, 0)
    e.dataTransfer.setData(DRAG.NEW, JSON.stringify({
      cId: component.cId
    }))
  }

  function renderComponents (components: RegisterComponent[]) {
    return components.map((component: RegisterComponent) => {
      return (
        <div
          key={component.cId}
          className={block}
          draggable
          onDragStart={e => {
            handleDragStart(e, component)
          }}
        >
          {component.name}
        </div>
      )
    })
  }

  useEffect(() => {
    setBaseComponents(currentComponents.getAllComponents('base'))
    setLayoutComponents(currentComponents.getAllComponents('layout'))
  }, [])

  return (
    <Space className={container} direction={'vertical'}>
      <div style={{fontWeight: 800, padding: '8px 8px 0'}}>基础组件</div>
      <div>{renderComponents(baseComponents)}</div>
      <div style={{fontWeight: 800, padding: '8px 8px 0'}}>布局容器</div>
      <div>{renderComponents(layoutComponents)}</div>
    </Space>
  )
}
