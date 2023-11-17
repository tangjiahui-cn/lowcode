import React from 'react';
import { UNIT_DEFAULT, PartialNumber, isNumber } from '.';

// 布局处理类型
export type StyleProcessLayout = {
  width?: PartialNumber; // 宽度（默认auto）
  widthUnit?: string; // 宽度单位 (默认px)
  height?: PartialNumber; // 高度 (默认auto)
  heightUnit?: string; // 高度单位（默认px）
  zIndex?: PartialNumber; // z-index（默认auto）

  // 内边距
  padding?: PartialNumber | string; // 默认0
  paddingUnit?: string; // 默认px
  paddingTop?: PartialNumber; // 默认0
  paddingLeft?: PartialNumber; // 默认0
  paddingRight?: PartialNumber; // 默认0
  paddingBottom?: PartialNumber; // 默认0
  paddingTopUnit?: string; // 默认px
  paddingLeftUnit?: string; // 默认px
  paddingRightUnit?: string; // 默认px
  paddingBottomUnit?: string; // 默认px

  // 外边距
  margin?: PartialNumber | string; // 默认0
  marginUnit?: string; // 默认px
  marginTop?: PartialNumber; // 默认0
  marginLeft?: PartialNumber; // 默认0
  marginRight?: PartialNumber; // 默认0
  marginBottom?: PartialNumber; // 默认0
  marginTopUnit?: string; // 默认px
  marginLeftUnit?: string; // 默认px
  marginRightUnit?: string; // 默认px
  marginBottomUnit?: string; // 默认px
};

/**
 * 布局 - 样式计算
 * @param data
 */
export function getLayoutStyle(data: StyleProcessLayout): React.CSSProperties {
  const style: React.CSSProperties = {};
  if (isNumber(data?.width)) style.width = data.width + (data?.widthUnit || UNIT_DEFAULT);
  if (isNumber(data?.height)) style.height = data.height + (data?.heightUnit || UNIT_DEFAULT);
  if (isNumber(data?.zIndex)) style.zIndex = data?.zIndex;

  if (data?.padding) {
    style.padding = data?.padding;
  } else {
    if (isNumber(data?.paddingTop)) {
      style.paddingTop = `${data?.paddingTop || 0}${data?.paddingTopUnit || UNIT_DEFAULT}`;
    }
    if (isNumber(data?.paddingRight)) {
      style.paddingRight = `${data?.paddingRight || 0}${data?.paddingRightUnit || UNIT_DEFAULT}`;
    }
    if (isNumber(data?.paddingBottom)) {
      style.paddingBottom = `${data?.paddingBottom || 0}${data?.paddingBottomUnit || UNIT_DEFAULT}`;
    }
    if (isNumber(data?.paddingLeft)) {
      style.paddingLeft = `${data?.paddingLeft || 0}${data?.paddingLeftUnit || UNIT_DEFAULT}`;
    }
  }

  if (data?.margin) {
    style.margin = data?.margin;
  } else {
    if (isNumber(data?.marginTop)) {
      style.marginTop = `${data?.marginTop || 0}${data?.marginTopUnit || UNIT_DEFAULT}`;
    }
    if (isNumber(data?.marginRight)) {
      style.marginRight = `${data?.marginRight || 0}${data?.marginRightUnit || UNIT_DEFAULT}`;
    }
    if (isNumber(data?.marginBottom)) {
      style.marginBottom = `${data?.marginBottom || 0}${data?.marginBottomUnit || UNIT_DEFAULT}`;
    }
    if (isNumber(data?.marginLeft)) {
      style.marginLeft = `${data?.marginLeft || 0}${data?.marginLeftUnit || UNIT_DEFAULT}`;
    }
  }

  return style;
}
