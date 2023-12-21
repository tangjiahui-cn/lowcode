import React from 'react';
import { LineType, PartialNumber } from '.';

export type TextAlign = 'start' | 'end' | 'center' | 'justify';
export type VerticalAlign = 'baseline' | 'top' | 'middle' | 'bottom' | 'sub' | 'text-top';

// 文字处理类型
export type StyleProcessText = {
  fontFamily?: string; // 字体
  fontSize?: PartialNumber; // 字号
  fontWeight?: string; // 自重
  lineHeight?: string; // 行高
  textAlign?: TextAlign; // 水平对齐
  verticalAlign?: VerticalAlign; // 垂直对齐
  color?: string; // 文字颜色
  fontStyle?: 'italic'; // 类型（是否斜体）
  textDecoration?: 'none' | 'underline' | 'overline' | 'line-through' | 'blink' | 'inherit'; // 下划线类型
  textDecorationStyle?: LineType; // 下划线类型
  textDecorationColor?: string; // 线条颜色
};
/**
 * 字体 - 样式计算
 * @param data
 */
export function getTextStyle(data: StyleProcessText): React.CSSProperties {
  return data as React.CSSProperties;
}
