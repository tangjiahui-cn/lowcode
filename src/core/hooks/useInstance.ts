/**
 * 根据jsonNode获取Instance
 *
 * At 2023/12/12
 * By TangJiaHui
 */
import { engine, Instance, JsonNode } from '@/core';
import { useMemo } from 'react';

export function useInstance(jsonNode: JsonNode): Instance | undefined {
  return useMemo(() => {
    return engine.instance.get(jsonNode.id);
  }, [jsonNode]);
}
