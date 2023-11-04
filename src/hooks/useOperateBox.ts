import { createOperateBox, DomType } from '../utils';
import React, { MutableRefObject, useEffect, useRef } from 'react';

/**
 * 创建 operate-box
 */

interface IOptions {
  getContainerFn: () => DomType;
  getChildFn: () => DomType;
  children: React.ReactNode;
}

type ReturnType = MutableRefObject<{
  // 挂载包裹元素到容器上
  mount: () => void;
  // 从容器上删除包裹元素
  remove: () => void;
  // 重置位置
  resize: () => void;
}>;

export function useOperateBox(options: IOptions): ReturnType {
  const wrapIns = useRef(
    createOperateBox(options?.getContainerFn, options?.getChildFn, options?.children),
  );
  // 组件销毁时清空
  useEffect(() => wrapIns.current.remove, []);
  return wrapIns;
}
