/**
 * 浮层包裹容器
 *
 * At 2023/12/11
 * By TangJiaHui
 */
import { useCallback, useRef } from 'react';
import { throttle } from 'lodash';
import { engine, createWrapBox, Props, Operate, useHook, useWindowResize } from '..';

export function useWrapBox(props: Props) {
  const wrapBoxRef = useRef<Operate>();
  const isShowRef = useRef(false);
  const ref = useRef<Operate>({
    show,
    hide,
    resize,
  });

  // 显示浮层
  function show() {
    isShowRef.current = true;
    // 获取可用的实例
    (wrapBoxRef.current ||= createWrapBox(props)).show();
    engine.wrapBox.add(wrapBoxRef.current);
  }

  // 浮层重置位置
  function resize() {
    if (!isShowRef.current) return;
    wrapBoxRef.current?.resize?.();
  }

  // 隐藏浮层
  function hide() {
    isShowRef.current = false;
    wrapBoxRef.current?.hide?.();
    engine.wrapBox.remove(wrapBoxRef.current);
    wrapBoxRef.current = undefined;
  }

  const throttleResize = useCallback(throttle(resize, 10), []);

  useHook('instance-scroll', throttleResize);
  useWindowResize(throttleResize);
  return ref;
}
