/**
 * 插件与内核交互逻辑：notify、hooks
 *
 * - notify: 一个操作流的开始端（插件向内核广播请求）
 * - hook: 一个操作流的中间端（插件拦截内核中的请求）
 * [x] api： 一个操作流的末端（插件暴露给内核的服务）【暂时不适用】
 * */
import { BaseEvent } from '../modal';
import type { BehaviorId } from './declarations';

export * from './useNotify';
export * from './useHook';

export type behaviorCallback<T = any> = (payload: T) => void;
export const behaviorEvent = new BaseEvent();

// 发起操作请求
export function notify<T = any>(id: BehaviorId, payload?: T) {
  behaviorEvent.notify(id, payload);
}

// 拦截操作
export function hook<T = any>(id: BehaviorId, callback?: behaviorCallback<T>) {
  behaviorEvent.on(id, callback);
}

// 取消拦截操作
export function unHook<T = any>(id: BehaviorId, callback?: behaviorCallback<T>) {
  behaviorEvent.remove(id, callback);
}
