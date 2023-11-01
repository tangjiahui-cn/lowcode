import * as React from "react";
import {DomType, getChildDomRect} from "./getChildDomRect";
import {runtime} from "../data";
import {css} from "class-css";

/**
 * 获取包裹盒子元素
 */
export function createWrapBox (
  style: React.CSSProperties,
  getContainerDom: () => DomType,
  getChildDom: () => DomType
) {
  let mountDom: DomType = null;

  function mount () {
    const container = getContainerDom();
    const child = getChildDom();
    if (!container || !child) {
      throw new Error('containerDom is not found')
    }
    if (mountDom) {
      return;
    }
    const editorDom = runtime.editor.domRef?.current as HTMLDivElement;
    mountDom = document.createElement('div');
    mountDom.className = css({
      position: 'absolute',
      ...style,
      ...getChildDomRect(container, child),
    })
    editorDom?.appendChild(mountDom);
  }

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
    remove
  }
}
