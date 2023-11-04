/**
 * 获取子元素在容器元素中的大小位置信息
 *
 * At 2023/11/01
 * By TangJiaHui
 */
export type DomType = HTMLDivElement | null | undefined;
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
