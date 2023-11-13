/**
 * 样式对象处理器
 *
 * At 2023/11/13
 * By TangJiaHui
 */
import React from 'react';
import { StyleProcessLayout, getLayoutStyle } from './getLayoutStyle';
import { getTextStyle, StyleProcessText } from './getTextStyle';

export * from './getLayoutStyle';
export * from './getTextStyle';

export type SizeUnit = 'px' | '%';
export type PartialNumber = number | null | undefined;
export type LineType = 'solid' | 'double' | 'dotted' | 'dashed' | 'wavy' | 'inherit';

// 默认单位
export const UNIT_DEFAULT: SizeUnit = 'px';

export type StyleProcessorData = {
  layout?: StyleProcessLayout;
  text?: StyleProcessText;
};

// 处理样式对象
function getStyle(styleProcess: StyleProcessorData = {}): React.CSSProperties {
  const style: React.CSSProperties = {};

  if (styleProcess?.layout) {
    Object.assign(style, getLayoutStyle(styleProcess?.layout));
  }

  if (styleProcess?.text) {
    Object.assign(style, getTextStyle(styleProcess?.text));
  }

  return style;
}

// 解析css值。（例如： padding: 4  => { top: 4, topUnit: 'px', ... ... }）
export function parseCssValue(value: string | number | null | undefined): {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
  topUnit?: string;
  rightUnit?: string;
  bottomUnit?: string;
  leftUnit?: string;
} {
  let top: number | undefined = 0;
  let right: number | undefined;
  let bottom: number | undefined;
  let left: number | undefined;
  let topUnit: string | undefined;
  let rightUnit: string | undefined;
  let bottomUnit: string | undefined;
  let leftUnit: string | undefined;

  if (value !== null && value !== undefined) {
    if (typeof value === 'number') {
      top = right = bottom = left = value;
    } else if (typeof value === 'string') {
      const arr = value.trim().split(' ');
      switch (arr.length) {
        case 1:
          top = right = bottom = left = parseInt(value);
          break;
        case 2:
          top = bottom = parseInt(arr[0]);
          left = right = parseInt(arr[1]);
          break;
        case 3:
          top = parseInt(arr[0]);
          left = right = parseInt(arr[1]);
          bottom = parseInt(arr[2]);
          break;
        case 4:
          top = parseInt(arr[0]);
          right = parseInt(arr[0]);
          bottom = parseInt(arr[0]);
          left = parseInt(arr[0]);
          break;
        default:
          break;
      }
    }
  }

  return {
    top,
    right,
    bottom,
    left,
    topUnit,
    rightUnit,
    bottomUnit,
    leftUnit,
  };
}

export const styleProcessor = {
  getStyle,
  getLayoutStyle,
};
