/**
 * 全局控制引擎
 *
 * 核心思想：
 * - 组件：模板
 * - 实例：运行时方法
 * - JSON：数据存储
 * - 事件系统：定义运行时组件间的行为
 */

export * from './hooks';
export * from './modal';
export * from './data';
export * from './utils';
export * from './style-processor';
export * from './types';

import {
  jsonNode,
  currentInstances,
  currentHoverInstanceStack,
  currentComponents,
  currentJson,
  currentPanels,
  currentSelectedInstance,
  global,
  runtime,
  currentVariables,
  currentInstanceEvents,
} from './data';
import { BaseEvent, event, styleProcessor } from '.';

export class Engine {
  // 当前json
  public json = currentJson;
  // json实例;
  public jsonNode = jsonNode;
  // 运行时实例
  public instance = currentInstances;
  // 已注册组件
  public component = currentComponents;
  // 事件系统
  public event = event;
  // 样式处理器
  public styleProcessor = styleProcessor;
  // 鼠标经过实例栈
  public hoverInstanceStack = currentHoverInstanceStack;
  // 鼠标选中实例
  public selectedInstance = currentSelectedInstance;
  // 运行时面板
  public panel = currentPanels;
  // 全局事件
  public globalEvent = new BaseEvent();
  // 配置项 - 全局变量
  public global = global;
  // 运行时
  public runtime = runtime;
  // 全局变量
  public variables = currentVariables;
  // 管理实例的事件
  public instanceEvents = currentInstanceEvents;
}

export const engine = new Engine();
