import React from 'react';
import { UNIT_DEFAULT, PartialNumber, BorderType, DEFAULT_BORDER, isNumber } from './index';

export type BorderUnit = 'px' | 'em' | 'rem';
export const borderUnitOptions = ['px', 'em', 'rem'].map((x) => {
  return { label: x, value: x };
});

// 布局处理类型
export type StyleProcessBorder = {
  borderTopLeftRadius?: PartialNumber; // 左上角圆角
  borderTopRightRadius?: PartialNumber; // 右上角圆角
  borderBottomLeftRadius?: PartialNumber; // 左下角圆角
  borderBottomRightRadius?: PartialNumber; // 右下角圆角
  borderTopLeftRadiusUnit?: BorderUnit; // 左上角圆角单位
  borderTopRightRadiusUnit?: BorderUnit; // 右上角圆角单位
  borderBottomLeftRadiusUnit?: BorderUnit; // 左下角圆角单位
  borderBottomRightRadiusUnit?: BorderUnit; // 右下角圆角单位

  borderTopColor?: string; // 上边框颜色
  borderTopWidth?: PartialNumber; // 上边框宽度
  borderTopWidthUnit?: BorderUnit; // 上边框宽度单位
  borderTopStyle?: BorderType; // 上边框线条样式

  borderRightColor?: string; // 右边框颜色
  borderRightWidth?: PartialNumber; // 右边框宽度
  borderRightWidthUnit?: BorderUnit; // 右边框宽度单位
  borderRightStyle?: BorderType; // 右边框线条样式

  borderBottomColor?: string; // 下边框颜色
  borderBottomWidth?: PartialNumber; // 下边框宽度
  borderBottomWidthUnit?: BorderUnit; // 下边框宽度单位
  borderBottomStyle?: BorderType; // 下边框线条样式

  borderLeftColor?: string; // 左边框颜色
  borderLeftWidth?: PartialNumber; // 左边框宽度
  borderLeftWidthUnit?: BorderUnit; // 左边框宽度单位
  borderLeftStyle?: BorderType; // 左边框线条样式
};

/**
 * 边框 - 样式计算
 * @param data
 */
export function getBorderStyle(data: StyleProcessBorder): React.CSSProperties {
  const style: React.CSSProperties = {};

  if (isNumber(data?.borderTopWidth)) {
    style.borderTopWidth = `${data?.borderTopWidth}${data?.borderTopWidthUnit || UNIT_DEFAULT}`;
    style.borderTopStyle = data?.borderTopStyle || DEFAULT_BORDER;
    style.borderTopColor = data?.borderTopColor;
  }

  if (isNumber(data?.borderRightWidth)) {
    style.borderRightWidth = `${data?.borderRightWidth}${
      data?.borderRightWidthUnit || UNIT_DEFAULT
    }`;
    style.borderRightStyle = data?.borderRightStyle || DEFAULT_BORDER;
    style.borderRightColor = data?.borderRightColor;
  }

  if (isNumber(data?.borderBottomWidth)) {
    style.borderBottomWidth = `${data?.borderBottomWidth}${
      data?.borderBottomWidthUnit || UNIT_DEFAULT
    }`;
    style.borderBottomStyle = data?.borderBottomStyle || DEFAULT_BORDER;
    style.borderBottomColor = data?.borderBottomColor;
  }

  if (isNumber(data?.borderLeftWidth)) {
    style.borderLeftWidth = `${data?.borderLeftWidth}${data?.borderLeftWidthUnit || UNIT_DEFAULT}`;
    style.borderLeftStyle = data?.borderLeftStyle || DEFAULT_BORDER;
    style.borderLeftColor = data?.borderLeftColor;
  }

  if (isNumber(data.borderTopLeftRadius)) {
    style.borderTopLeftRadius = `${data?.borderTopLeftRadius}${
      data?.borderTopLeftRadiusUnit || UNIT_DEFAULT
    }`;
  }
  if (isNumber(data.borderTopRightRadius)) {
    style.borderTopRightRadius = `${data?.borderTopRightRadius}${
      data?.borderTopRightRadiusUnit || UNIT_DEFAULT
    }`;
  }
  if (isNumber(data.borderBottomLeftRadius)) {
    style.borderBottomLeftRadius = `${data?.borderBottomLeftRadius}${
      data?.borderBottomLeftRadiusUnit || UNIT_DEFAULT
    }`;
  }
  if (isNumber(data.borderBottomRightRadius)) {
    style.borderBottomRightRadius = `${data?.borderBottomRightRadius}${
      data?.borderBottomRightRadiusUnit || UNIT_DEFAULT
    }`;
  }
  return style;
}
