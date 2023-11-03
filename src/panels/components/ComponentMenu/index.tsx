import {currentComponents, RegisterComponent} from '../../../data'
import {Space} from "antd";
import {container, block} from "./style";
import {img} from "../../index";
import * as React from "react";
import {useEffect, useState} from "react";
import {DRAG, CType} from "../../../enum";

interface Item {
  title: string;
  components: RegisterComponent[];
}

/**
 * 组件树面板
 *
 * At 2023/10/31
 * By TangJiaHui
 */
export default function ComponentMenu () {
  const [list, setList] = useState<Item[]>([]);

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
    setList([
      {
        title: '基础组件',
        components: currentComponents.getAllComponents(CType.BASE)
      },
      {
        title: '展示组件',
        components: currentComponents.getAllComponents(CType.DISPLAY)
      },
      {
        title: '布局组件',
        components: currentComponents.getAllComponents(CType.LAYOUT)
      },
    ])
  }, [])

  return (
    <Space className={container} direction={'vertical'}>
      {
        list.map((item: Item, index: number) => {
          return (
            <Space key={index} style={{width: '100%'}} direction={'vertical'}>
              <div style={{fontWeight: 800, padding: '8px 8px 0'}}>
                {item?.title}
              </div>
              <div>{renderComponents(item?.components)}</div>
            </Space>
          )
        })
      }
    </Space>
  )
}
