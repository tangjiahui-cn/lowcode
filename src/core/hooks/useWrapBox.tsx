/**
 * 浮层包裹容器
 *
 * At 2023/12/11
 * By TangJiaHui
 */
import React, { useEffect, useRef } from 'react';
import { throttle } from 'lodash';
import { engine, EVENT, createWrapBox } from '..';

interface Props {
  getContainer: () => HTMLElement | undefined; // 获取容器DOM的函数
  getTarget: () => HTMLElement | undefined; // 获取子DOM的函数
  style?: React.CSSProperties; // 包裹盒子样式
  operate?: React.ReactNode; // 操作盒子
}

interface Operate {
  show: () => void;
  hide: () => void;
  resize: () => void;
}

export function useWrapBox(props: Props) {
  const wrapBoxRef = useRef<Operate>();
  const ref = useRef<Operate>({
    show,
    hide,
    resize,
  });

  // 显示浮层
  function show() {
    // 获取可用的实例
    (wrapBoxRef.current ||= createWrapBox(props)).show();
  }

  // 浮层重置位置
  function resize() {
    wrapBoxRef.current?.resize?.();
  }

  // 隐藏浮层
  function hide() {
    wrapBoxRef.current?.hide?.();
    wrapBoxRef.current = undefined;
  }

  useEffect(() => {
    const throttleResize = throttle(resize, 8);
    // 监听窗口大小变化
    window.addEventListener('resize', throttleResize);
    // 监听全局实例滚动事件
    engine.event.on(EVENT.instanceScroll, throttleResize);
    return () => {
      window.removeEventListener('resize', throttleResize);
      engine.event.remove(EVENT.instanceScroll, throttleResize);
    };
  }, []);

  return ref;
}
