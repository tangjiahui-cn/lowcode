/**
 * 组件库面板
 *
 * At 2023/12/11
 * By TangJiaHui
 */
import { Space } from 'antd';
import { useEffect, useState } from 'react';
import { Component, cType, runtime, startFlow } from '@/engine';
import RenderChildren from './components/RenderChildren';

interface Option {
  name: string;
  cType: cType;
  children: Component[];
}

export default function () {
  const [list, setList] = useState<Option[]>([]);

  useEffect(() => {
    setList(
      [
        {
          cType: cType.Base,
          name: '基础组件',
          children: runtime.components.getAllByCType(cType.Base),
        },
        {
          cType: cType.Container,
          name: '容器组件',
          children: runtime.components.getAllByCType(cType.Container),
        },
        {
          cType: cType.Table,
          name: '列表组件',
          children: runtime.components.getAllByCType(cType.Table),
        },
        // isLayout && {
        //   cType: cType.LayoutChildren,
        //   name: '容器占位组件',
        //   children: runtime.components.getAllByCType(cType.LayoutChildren),
        // },
      ].filter(Boolean) as any[],
    );
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
      <Space direction={'vertical'} style={{ width: '100%' }} size={0}>
        {list.map((option) => {
          return (
            <Space key={option.cType} direction={'vertical'} style={{ width: '100%' }} size={0}>
              <div style={{ padding: '8px 12px', fontWeight: 'bold' }}>{option.name}</div>
              <RenderChildren
                components={option.children}
                onDragStart={(e, component) => {
                  const img = runtime.components.getDragImage(component.cId);
                  e.dataTransfer.setDragImage(img, 0, 0);
                  startFlow('jsonNode-new', {
                    data: component,
                  });
                }}
              />
            </Space>
          );
        })}
      </Space>
    </div>
  );
}
