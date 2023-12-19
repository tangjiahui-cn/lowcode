/**
 * 拦截插件发起的请求
 *
 * At 2023/12/18
 * By TangJiaHui
 */
import { BehaviorId } from './declarations';
import { useCallback, useEffect } from 'react';
import { behaviorCallback, behaviorEvent } from '.';

export function useHook(id: BehaviorId, callback: behaviorCallback) {
  const callBackCache = useCallback(callback, []);

  useEffect(() => {
    behaviorEvent.on(id, callBackCache);
    return () => {
      behaviorEvent.remove(id, callBackCache);
    };
  }, []);
}
