/**
 * 组件库面板
 *
 * At 2023/12/11
 * By TangJiaHui
 */
import { Space } from 'antd';
import { useEffect, useState } from 'react';
import { Component, cType, engine } from '@/core';
import RenderChildren from './components/RenderChildren';

interface Option {
  name: string;
  cType: cType;
  children: Component[];
}

export default function () {
  const [list, setList] = useState<Option[]>([]);

  useEffect(() => {
    setList([
      { cType: cType.Base, name: '基础组件', children: engine.component.getAllByCType(cType.Base) },
      {
        cType: cType.Container,
        name: '容器组件',
        children: engine.component.getAllByCType(cType.Container),
      },
      {
        cType: cType.Table,
        name: '列表组件',
        children: engine.component.getAllByCType(cType.Table),
      },
    ]);
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
                  engine.api.component.startDrag(e, component);
                }}
              />
            </Space>
          );
        })}
      </Space>
    </div>
  );
}
