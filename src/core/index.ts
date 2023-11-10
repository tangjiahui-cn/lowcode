/**
 * 全局控制引擎
 *
 * 核心思想：
 * - 组件：模板
 * - 实例：运行时方法
 * - JSON：数据存储
 * - 事件系统：运行时流程、运行时规则定义、初始声明
 */
export * from './hooks';
export * from './modal';
export * from './data';

import { currentInstances } from '../data';
import { event } from '.';

export class Engine {
  // 运行时实例集合
  public instance = currentInstances;
  // 事件系统
  public event = event;
}

export const engine = new Engine();
