/**
 * 样式对象处理器
 *
 * At 2023/11/13
 * By TangJiaHui
 */
import React from 'react';
import { getLayoutStyle, StyleProcessLayout } from './getLayoutStyle';
import { getTextStyle, StyleProcessText } from './getTextStyle';
import { getPositionStyle, StyleProcessPosition } from './getPositionStyle';
import { getBorderStyle, StyleProcessBorder } from './getBorderStyle';

export * from './getLayoutStyle';
export * from './getTextStyle';
export * from './getPositionStyle';
export * from './getBorderStyle';

export type SizeUnit = 'px' | '%';
export const DEFAULT_SIZE_UNIT = 'px';
export const sizeUnitOptions = ['px', '%'].map((x) => {
  return { label: x, value: x };
});

export type PartialNumber = number | null | undefined;
export type LineType = 'solid' | 'double' | 'dotted' | 'dashed' | 'wavy' | 'inherit' | undefined;
export const lineTypeOptions = ['solid', 'double', 'dotted', 'dashed', 'wavy', 'none'].map((x) => {
  return { label: x, value: x };
});

export type BorderType =
  | 'none'
  | 'hidden'
  | 'dotted'
  | 'dashed'
  | 'solid'
  | 'double'
  | 'groove'
  | 'ridge'
  | 'inset'
  | 'outset';
export const DEFAULT_BORDER: BorderType = 'solid';
export const borderTypeOptions = [
  'none',
  'hidden',
  'dotted',
  'dashed',
  'solid',
  'double',
  'groove',
  'ridge',
  'inset',
  'outset',
].map((x) => {
  return { label: x, value: x };
});

export const isNumber = (v: unknown): v is number => {
  return typeof v === 'number' && !isNaN(v) && Number.isFinite(v);
};

// 默认单位
export const UNIT_DEFAULT: SizeUnit = 'px';

export type StyleProcessorData = {
  layout?: StyleProcessLayout;
  text?: StyleProcessText;
  position?: StyleProcessPosition;
  border?: StyleProcessBorder;
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

  if (styleProcess?.position) {
    Object.assign(style, getPositionStyle(styleProcess?.position));
  }

  if (styleProcess?.border) {
    Object.assign(style, getBorderStyle(styleProcess?.border));
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
