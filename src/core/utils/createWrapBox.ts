import * as React from 'react';
import { DomType, getChildDomRect } from './getChildDomRect';
import { css } from 'class-css';
import { throttle } from 'lodash';
import { globalEvent, globalVariable } from '../../data';
import { EVENT } from '../../enum';

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
  }, globalVariable.eventThrottleDelay);

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
    globalEvent.on(EVENT.SCROLL, resize);
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
    globalEvent.remove(EVENT.SCROLL, resize);
  }

  return {
    mount,
    remove,
    resize,
  };
}
