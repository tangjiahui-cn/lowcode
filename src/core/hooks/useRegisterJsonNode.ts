import { useEffect } from 'react';
import { JsonNode } from '../../data';
import { engine } from '..';

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
