/**
 * 组件事件系统
 *
 * At 2023/11/06
 * By TangJiaHui
 */
import { EventEmitter } from './globalEvent';

type CallBack = (payload: any) => void;

const eventMap = new Map<string, EventEmitter>();
export const globalEventSystem = {
  notify(insId?: string, triggerEventId?: string, payload?: any) {
    if (!insId) {
      throw new Error('insId is not exist.');
    }
    if (!triggerEventId) {
      throw new Error('triggerEventId is not exist.');
    }
    if (!payload) {
      throw new Error('payload is not exist.');
    }

    if (!eventMap.get(insId) || !insId) {
      return;
    }
    eventMap.get(insId)?.notify?.(triggerEventId, payload);
  },
  remove(insId?: string, triggerEventId?: string, callback?: CallBack) {
    if (!insId) {
      throw new Error('insId is not exist.');
    }
    if (!triggerEventId) {
      throw new Error('triggerEventId is not exist.');
    }
    if (!callback) {
      throw new Error('callback is not exist.');
    }
    eventMap.get(insId)?.remove?.(triggerEventId, callback);
  },
  on(insId?: string, triggerEventId?: string, callback?: CallBack) {
    if (!insId) {
      throw new Error('insId is not exist.');
    }
    if (!triggerEventId) {
      throw new Error('triggerEventId is not exist.');
    }
    if (!callback) {
      throw new Error('callback is not exist.');
    }

    if (!eventMap.get(insId)) {
      eventMap.set(insId, new EventEmitter());
    }
    eventMap.get(insId)?.on(triggerEventId, callback);
  },
};
