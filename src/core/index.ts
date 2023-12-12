/**
 * 低代码引擎
 *
 * 说明：
 * * JsonNode: 存储数据
 * * Instance: 运行时实例
 * * Component: 定义组件模板
 */
export type * from './declarations';
import { api } from './api';
import { event } from './event';

import { instance, component, jsonNode, instanceStack, panel, selectedInstance } from './data';

export * from './enum';
export * from './event';
export * from './declarations';
export * from './hooks';
export * from './hooks-common';
export * from './utils';

export const engine = {
  // 内部api
  api,
  // 全局事件
  event,
  // 运行时实例
  instance,
  // 组件库
  component,
  // jsonNode
  jsonNode,
  // 鼠标经过实例栈
  instanceStack,
  // 管理所有的面板
  panel,
  // 当前选中实例
  selectedInstance,
};
