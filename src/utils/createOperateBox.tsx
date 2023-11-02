import * as React from "react";
import {DomType, getChildDomRect} from "./getChildDomRect";
import {css} from "class-css";
import {createRoot} from "react-dom/client";

/**
 * 获取包裹盒子元素
 */
export function createOperateBox (
  getContainerDom: () => DomType,
  getChildDom: () => DomType,
  children: React.ReactNode
) {
  let mountDom: DomType = null;

  // 挂载wrap-box
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
          transform: 'translate(0, -100%)'
        })}
      >
        {children}
      </div>
    )

    container?.appendChild(mountDom);
  }

  // 移出 wrap-box
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
  }

  return {
    mount,
    remove,
  }
}
