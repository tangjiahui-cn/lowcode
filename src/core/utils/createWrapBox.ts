import * as React from 'react';
import { DomType, getChildDomRect } from './getChildDomRect';
import { css } from 'class-css';
import { throttle } from 'lodash';
import { EVENT } from '../../enum';
import { engine } from '../index';

/**
 * 获取包裹盒子元素
 */
export function createWrapBox(
  style: React.CSSProperties,
  getContainerDom: () => DomType,
  getChildDom: () => DomType,
) {
  let mountDom: DomType = null;

  const resize = throttle(() => {
    // 等页面全部更新完毕再重置wrap-box
    setTimeout(() => {
      const container = getContainerDom();
      const child = getChildDom();
      if (!container || !child || !mountDom) {
        return;
      }

      mountDom.className = css({
        position: 'absolute',
        ...style,
        ...getChildDomRect(container, child),
      });
    });
  }, engine.global.eventThrottleDelay);

  // 挂载wrap-box
  function mount() {
    const container = getContainerDom();
    const child = getChildDom();
    if (!container || !child || mountDom) {
      return;
    }

    mountDom = document.createElement('div');
    mountDom.className = css({
      position: 'absolute',
      ...style,
      ...getChildDomRect(container, child),
    });

    container?.appendChild(mountDom);
    // 窗口变化时重置UI
    window.addEventListener('resize', resize);
    // 组件滚动时重置UI
    engine.globalEvent.on(EVENT.SCROLL, resize);

    // 监听当前最大zIndex
    mountDom && ((mountDom as any).style.zIndex = engine.global.maxZIndex);
    engine.globalEvent.on(EVENT.SET_MAX_Z_INDEX, listenZIndex);
  }

  function listenZIndex(zIndex: number) {
    if (mountDom) {
      (mountDom as any).style.zIndex = zIndex;
    }
  }

  // 移出 wrap-box
  function remove() {
    const container = getContainerDom();
    if (!mountDom || !container) {
      return;
    }
    container.removeChild(mountDom);
    mountDom = null;
    window.removeEventListener('resize', resize);
    engine.globalEvent.remove(EVENT.SCROLL, resize);

    // 取消监听zIndex事件
    engine.globalEvent.remove(EVENT.SET_MAX_Z_INDEX, listenZIndex);
  }

  return {
    mount,
    remove,
    resize,
  };
}
