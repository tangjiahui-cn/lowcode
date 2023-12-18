/**
 * 浮层包裹容器
 *
 * At 2023/12/11
 * By TangJiaHui
 */
import { useEffect, useRef } from 'react';
import { throttle } from 'lodash';
import { engine, EVENT, createWrapBox, Props, Operate } from '..';

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
    engine.wrapBox.add(wrapBoxRef.current);
  }

  // 浮层重置位置
  function resize() {
    wrapBoxRef.current?.resize?.();
  }

  // 隐藏浮层
  function hide() {
    wrapBoxRef.current?.hide?.();
    engine.wrapBox.remove(wrapBoxRef.current);
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
