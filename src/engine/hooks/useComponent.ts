/**
 * 根据jsonNode获取Component
 *
 * At 2023/12/12
 * By TangJiaHui
 */
import { Component, JsonNode, runtime } from '..';
import { useMemo } from 'react';

export function useComponent(jsonNode: JsonNode): Component | undefined {
  return useMemo(() => {
    return runtime.components.get(jsonNode.cId);
  }, [jsonNode]);
}
