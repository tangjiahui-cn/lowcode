/**
 * 插件向内核发起请求
 *
 * At 2023/12/18
 * By TangJiaHui
 */
import { BehaviorId } from './declarations';
import { useCallback } from 'react';
import { behaviorEvent, behaviorCallback } from '.';

export function useNotify<T = any>(id: BehaviorId): behaviorCallback {
  return useCallback((payload: T) => {
    behaviorEvent.notify(id, payload);
  }, []);
}
