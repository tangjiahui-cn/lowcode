/**
 * 根据jsonNode获取Component
 *
 * At 2023/12/12
 * By TangJiaHui
 */
import { Component, engine, JsonNode } from '@/core';
import { useMemo } from 'react';

export function useComponent(jsonNode: JsonNode): Component | undefined {
  return useMemo(() => {
    return engine.component.get(jsonNode.cId);
  }, [jsonNode]);
}
