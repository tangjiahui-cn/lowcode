import * as React from "react";
import {DomType, getChildDomRect} from "./getChildDomRect";
import {currentPanels} from "../data";
import {css} from "class-css";
import {throttle} from "lodash";

/**
 * 获取包裹盒子元素
 */
export function createWrapBox (
  style: React.CSSProperties,
  getContainerDom: () => DomType,
  getChildDom: () => DomType
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

    mountDom.className = css({
      position: 'absolute',
      ...style,
      ...getChildDomRect(container, child),
    })
  }, 4)

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
    const editorDom = currentPanels.editor.domRef?.current as HTMLDivElement;
    mountDom = document.createElement('div');
    mountDom.className = css({
      position: 'absolute',
      ...style,
      ...getChildDomRect(container, child),
    })
    editorDom?.appendChild(mountDom);
    window.addEventListener('resize', resize)
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
    window.removeEventListener('resize', resize)
  }

  return {
    mount,
    remove
  }
}
