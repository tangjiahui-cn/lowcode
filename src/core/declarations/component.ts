/**
 * 组件声明
 *
 * At 2023/12/07
 * By TangJiaHui
 */
import * as React from 'react';
import type { DOMAttributes } from 'react';
import { cType, StyleProcessorData } from '..';

// 组件Attributes属性
export type AttributesProps<T> = {
  attributes: T;
  onChange: (attributes: T) => void;
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

  // 预处理样式
  styleData?: StyleProcessorData;
};

// 组件定义事件类型
export type ComEvent<T = string> = {
  eventType: T; // 事件类型
  eventName: string; // 事件名称（用于事件面板下拉展示）
};

// 组件类型
export type Component<Attributes = any> = {
  cId: string; // 组件类型id
  cName: string; // 组件名称
  cType: cType; // 组件类型（代办同一类组件，用于分类）
  icon?: string; // 组件占位图标

  // 特殊标识
  isPage?: boolean; // 是否是页面
  isChildren?: boolean; // 是否可以存放子元素
  isLayoutChildren?: boolean; // 是布局页面中用来占位子元素的组件

  // 默认值
  defaultAttributes?: Attributes;

  /********** 事件系统 *********/
  triggerEvents?: ComEvent[]; // 组件触发事件
  exposeEvents?: ComEvent[]; // 组件暴露事件

  // 模板
  template?: React.FunctionComponent<TemplateProps<any>>; // 组件模板
  attributeTemplate?: React.FunctionComponent<AttributesProps<Attributes>>; // 组件私有属性模板
};
