/**
 * 监听选中页面变化
 *
 * At 2023/12/10
 * By TangJiaHui
 */
import { engine, EVENT, JsonNode } from '@/core';
import { useCallback, useEffect } from 'react';

type Callback = (payload: JsonNode[]) => void;
export function useListenPage(callback: Callback) {
  const callbackCache = useCallback((payload: JsonNode[]) => {
    callback(payload);
  }, []);

  useEffect(() => {
    // 开发模式，除了第一次后续每次都要清空缓存避免影响
    if (__DEV__) {
      engine.event.removeKey(EVENT.setPage);
    }
    engine.event.on(EVENT.setPage, callbackCache);
    return () => {
      engine.event.removeKey(EVENT.setPage);
    };
  }, []);
}
