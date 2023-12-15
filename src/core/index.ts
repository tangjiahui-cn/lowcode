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
import { project } from './project';

import { instance, component, jsonNode, panel, runtime, wrapBox } from './data';

export { COMPONENT_KEY } from './api/component';
export * from './enum';
export * from './event';
export * from './declarations';
export * from './hooks';
export * from './hooks-common';
export * from './utils';
export * from './style-processor';
import { styleProcessor } from './style-processor';

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
  // 管理所有的面板
  panel,
  // 运行时变量
  runtime,
  // 样式处理器（待重写）
  styleProcessor,
  // 项目管理
  project,
  // 鼠标经过、聚焦盒子实例
  wrapBox
};
