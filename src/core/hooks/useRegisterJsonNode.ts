/**
 * 注册jsonNode
 *
 * At 2023/12/11
 * By TangJiaHui
 */
import { useEffect } from 'react';
import { engine, JsonNode } from '@/core';

export function useRegisterJsonNode(jsonNode: JsonNode) {
  useEffect(() => {
    engine.jsonNode.register(jsonNode);
    return () => {
      engine.instance.unRegister(jsonNode.id);
    };
  }, [jsonNode]);
}
