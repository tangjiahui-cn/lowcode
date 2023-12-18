/**
 * 监听选中JsonNode
 *
 * At 2023/12/12
 * By TangJiaHui
 */
import { engine, EVENT, JsonNode } from '@/core';
import { useCallback, useEffect } from 'react';

type Callback = (payload: JsonNode) => void;
export function useListenSelectJsonNode(callback: Callback) {
  const callbackCache = useCallback((payload: JsonNode) => {
    callback(payload);
  }, []);

  useEffect(() => {
    engine.event.on(EVENT.selectJsonNode, callbackCache);
    return () => {
      engine.event.removeKey(EVENT.selectJsonNode);
    };
  }, []);
}
