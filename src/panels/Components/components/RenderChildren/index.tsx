/**
 * 渲染组件列表
 *
 * At 2023/12/11
 * By TangJiaHui
 */
import { Component } from '@/core';
import { blockClass, emptyClass } from './style';
import * as React from 'react';

interface IProps {
  components: Component[];
  onDragStart?: (e: React.DragEvent<HTMLDivElement>, component: Component) => void;
}

export default function (props: IProps) {
  return (
    <div>
      {props?.components?.length ? (
        props?.components?.map((component: Component) => {
          return (
            <div
              key={component.cId}
              className={blockClass}
              draggable
              onDragStart={(e: React.DragEvent<HTMLDivElement>) => {
                props?.onDragStart?.(e, component);
              }}
            >
              {component?.cName}
            </div>
          );
        })
      ) : (
        <div className={emptyClass}>暂无数据</div>
      )}
    </div>
  );
}
