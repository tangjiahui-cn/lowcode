/**
 * 从组件创建一个新的JsonNode
 *
 * At 2023/12/11
 * By TangJiaHui
 */
import { Component, JsonNode } from '..';
import { v4 as uuid } from 'uuid';

export function createJsonNode(component: Component): JsonNode {
  return {
    id: uuid(),
    cId: component.cId,
  };
}
