/**
 * 组件声明
 *
 * At 2023/12/07
 * By TangJiaHui
 */
import * as React from 'react';
import type { DOMAttributes } from 'react';
import { cType } from '..';

// 组件Attributes属性
export type AttributesProps<T> = {
  attributes: T;
  onChange: (attributes: T) => void;
};

// 组件类型
export type Component<Attributes = any> = {
  cId: string; // 组件类型id
  name?: string; // 组件名称
  icon?: string; // 组件占位图标
  cType: cType; // 组件类型（代办同一类组件，用于分类）

  // 特殊标识
  isPage?: boolean; // 是否是页面
  isChildren?: boolean; // 是否可以存放子元素

  // 模板
  template: TemplateType; // 组件模板
  attributeTemplate?: React.FunctionComponent<Attributes>; // 组件私有属性模板
};

// 模板类型
export type TemplateProps<Attributes, E = any> = {
  id: string;
  // 获取dom的函数
  getDomFn: (fn: () => E | null) => void;
  // 属性
  attributes?: Attributes;
  // 原生事件
  events?: DOMAttributes<E>;
  // 子元素
  children?: React.ReactNode[];
};

// 模板组件类型
export type TemplateType = React.FunctionComponent<TemplateProps<any>>;
