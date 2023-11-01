import {createWrapBox, DomType} from "../utils";
import {MutableRefObject, useEffect, useRef} from "react";

/**
 * 控制子节点的包裹元素显示（在容器中的绝对定位位置）
 */

interface IOptions {
  style: React.CSSProperties;
  getContainerFn: () => DomType;
  getChildFn: () => DomType;
}

type ReturnType = {
  // 挂载包裹元素到容器上
  mount: () => void;
  // 从容器上删除包裹元素
  remove: () => void;
}

export function useWrapBox (options: IOptions): MutableRefObject<ReturnType> {
  const wrapIns = useRef(createWrapBox(options.style, options.getContainerFn, options.getChildFn));
  useEffect(() => wrapIns.current.remove, [])
  return wrapIns;
}
