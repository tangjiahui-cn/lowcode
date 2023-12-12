/**
 * 浮层包裹容器
 *
 * At 2023/12/11
 * By TangJiaHui
 */
import React, { useEffect, useRef } from 'react';
import { css } from 'class-css';
import { throttle } from 'lodash';
import { engine, EVENT } from '@/core';

interface Props {
  getContainer: () => HTMLElement | undefined; // 获取容器DOM的函数
  getTarget: () => HTMLElement | undefined; // 获取子DOM的函数
  style?: React.CSSProperties; // 包裹盒子样式
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
    (wrapBoxRef.current = getWrapBox(props)).show();
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

  // 监听窗口大小变化
  useEffect(() => {
    const throttleResize = throttle(resize, 8);
    window.addEventListener('resize', throttleResize);
    engine.event.on(EVENT.scroll, throttleResize);
    return () => {
      window.removeEventListener('resize', throttleResize);
      engine.event.remove(EVENT.scroll, throttleResize);
    };
  }, []);

  return ref;
}

/**
 * 获取一个可用的wrapBox
 *
 * At 2023/12/11
 * By TangJiaHui
 */
function getWrapBox(props: Props): Operate {
  let mountDom: HTMLElement | undefined = undefined;
  let container: HTMLElement | undefined = undefined;
  let target: HTMLElement | undefined = undefined;

  function lazyMount() {
    if (container || target) {
      return;
    }
    container = props?.getContainer?.();
    target = props?.getTarget?.();
    if (!container) {
      throw new Error('container is not exist.');
    }
    if (!target) {
      throw new Error('target is not exist.');
    }
    if (!mountDom) {
      mountDom = document.createElement('div');
    }
  }

  function resize() {
    lazyMount();
    if (mountDom) {
      const info = getChildDomRect(container, target);
      mountDom.className = css({
        ...info,
        position: 'absolute',
        background: 'transparent',
        border: '1px dashed blue',
        boxSizing: 'border-box',
        pointerEvents: 'none',
        ...props?.style,
      });
    }
  }

  function show() {
    resize();
    if (mountDom) {
      container?.appendChild?.(mountDom);
    }
  }

  function hide() {
    if (mountDom) {
      container?.removeChild?.(mountDom);
    }
  }

  return {
    show,
    hide,
    resize,
  };
}

/**
 * 获取子元素在容器元素中的大小位置信息
 *
 * At 2023/11/01
 * By TangJiaHui
 */
export type DomType = HTMLElement | null | undefined;
export function getChildDomRect(
  containerDom: DomType,
  childDom: DomType,
): {
  left: number;
  top: number;
  width: number;
  height: number;
} {
  if (!containerDom || !childDom) {
    throw new Error('dom is not exist');
  }
  const container: DOMRect = containerDom?.getBoundingClientRect?.();
  const child: DOMRect = childDom?.getBoundingClientRect?.();
  return {
    left: child?.x - container?.x,
    top: child.y - container?.y,
    width: child.width,
    height: child.height,
  };
}
