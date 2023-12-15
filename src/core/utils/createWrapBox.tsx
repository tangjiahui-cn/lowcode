/**
 * 获取一个可用的wrapBox
 *
 * At 2023/12/11
 * By TangJiaHui
 */
import { createRoot } from 'react-dom/client';
import { css } from 'class-css';
import { getChildDomRect } from '.';
import React from 'react';

export interface Props {
  getContainer: () => HTMLElement | undefined; // 获取容器DOM的函数
  getTarget: () => HTMLElement | undefined; // 获取子DOM的函数
  getOperateContainer?: () => HTMLElement | undefined; // 获取操作盒子DOM的函数
  style?: React.CSSProperties; // 包裹盒子样式
  operate?: React.ReactNode; // 操作盒子
}

export interface Operate {
  show: () => void;
  hide: () => void;
  resize: () => void;
}

export function createWrapBox(props: Props): Operate {
  let mountDom: HTMLElement | undefined = undefined;
  let operateDom: HTMLElement | undefined = undefined;
  let container: HTMLElement | undefined = undefined;
  let target: HTMLElement | undefined = undefined;
  let operateContainer: HTMLElement | undefined;

  function lazyMount() {
    if (container || target) {
      return;
    }

    target = props?.getTarget?.();
    container = props?.getContainer?.();
    operateContainer =
      props?.getOperateContainer?.() ||
      container ||
      document.getElementById('root') ||
      document.body;

    if (!container) {
      throw new Error('container is not exist.');
    }
    if (!target) {
      throw new Error('target is not exist.');
    }
    if (!mountDom) {
      mountDom = document.createElement('div');
    }
    if (props?.operate) {
      if (!operateDom) {
        operateDom = document.createElement('div');
      }
      createRoot(operateDom).render(
        <div
          className={css({
            transform: 'translate(0, calc(-100% - 1px))',
          })}
        >
          {props?.operate}
        </div>,
      );
    }
  }

  function resize() {
    lazyMount();
    let info: any;
    if (mountDom) {
      info = getChildDomRect(container, target);
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
    if (operateDom) {
      if (container === operateContainer) {
        info ||= getChildDomRect(container, target);
      } else {
        info = getChildDomRect(operateContainer, target);
      }
      operateDom.className = css({
        position: 'absolute',
        left: info.left,
        top: info.top,
        width: 0,
        height: 0,
      });
    }
  }

  function show() {
    resize();
    if (mountDom) {
      container?.appendChild?.(mountDom);
    }
    if (operateDom) {
      operateContainer?.appendChild?.(operateDom);
    }
  }

  function hide() {
    if (mountDom) {
      container?.removeChild?.(mountDom);
    }
    if (operateDom) {
      operateContainer?.removeChild?.(operateDom);
    }
  }

  return {
    show,
    hide,
    resize,
  };
}
