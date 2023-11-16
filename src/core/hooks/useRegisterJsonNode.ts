import { useEffect } from 'react';
import { engine, JsonNode } from '..';

/**
 * 注册jsonNode
 */
export function useRegisterJsonNode(jsonNode?: JsonNode) {
  useEffect(() => {
    engine.jsonNode.add(jsonNode);
    return () => {
      engine.jsonNode.remove(jsonNode?.id);
    };
  }, [jsonNode]);
}
