import * as React from 'react';
import { Component, engine } from '@/core';

export enum COMPONENT_KEY {
  DRAG_NEW = '1',
}

export const component = {
  startDrag(e: React.DragEvent<HTMLDivElement>, component: Component) {
    const img = engine.component.getDragImage(component.cId);
    e.dataTransfer.setDragImage(img, 0, 0);
    e.dataTransfer.setData(
      COMPONENT_KEY.DRAG_NEW,
      JSON.stringify({
        cId: component.cId,
      }),
    );
  },
};
