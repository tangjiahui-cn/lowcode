import * as React from "react";
import {DomType, getChildDomRect} from "./getChildDomRect";
import {css} from "class-css";
import {createRoot} from "react-dom/client";
import {throttle} from "lodash";
import {globalEvent, globalVariable} from "../data";
import {EVENT} from "../enum";

/**
 * 获取包裹盒子元素
 */
export function createOperateBox (
  getContainerDom: () => DomType,
  getChildDom: () => DomType,
  children: React.ReactNode
) {
  let mountDom: DomType = null;

  const resize = throttle(() => {
    if (!mountDom) {
      return;
    }

    const container = getContainerDom();
    const child = getChildDom();
    if (!container || !child) {
      throw new Error('containerDom is not found')
    }

    const sizeInfo = getChildDomRect(container, child);
    mountDom.className = css({
      position: "absolute",
      left: sizeInfo.left,
      top: sizeInfo.top,
      width: 0,
      height: 0,
    })
  }, globalVariable.eventThrottleDelay)

  // 挂载 operate-box
  function mount () {
    const container = getContainerDom();
    const child = getChildDom();
    if (!container || !child) {
      throw new Error('containerDom is not found')
    }
    if (mountDom) {
      return;
    }
    const sizeInfo = getChildDomRect(container, child);
    mountDom = document.createElement('div');
    mountDom.className = css({
      position: "absolute",
      left: sizeInfo.left,
      top: sizeInfo.top,
      width: 0,
      height: 0,
    })

    createRoot(mountDom).render(
      <div
        className={css({
          transform: 'translate(0, calc(-100% - 1px))'
        })}
      >
        {children}
      </div>
    )

    container?.appendChild(mountDom);
    // 窗口变化时重置UI
    window.addEventListener('resize', resize)
    // 组件滚动时重置UI
    globalEvent.on(EVENT, resize)
  }

  // 移出 operate-box
  function remove () {
    const container = getContainerDom();
    if (!container) {
      throw new Error('containerDom is not found')
    }
    if (!mountDom) {
      return;
    }

    container.removeChild(mountDom)
    mountDom = null;
    window.removeEventListener('resize', resize)
    globalEvent.remove(EVENT, resize)
  }

  return {
    mount,
    remove,
    resize
  }
}
