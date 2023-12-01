import { createJsonNode } from './createJsonNode';
import { engine, JsonNode } from '..';

/**
 * 创建一个包含初始Page的JSON
 */
export function createInitJson(): JsonNode[] {
  const component = engine.component.getComponent('i-page');
  if (!component) {
    throw new Error('page component is not found.');
  }
  const pageJsonNode = createJsonNode(component);
  return pageJsonNode ? [pageJsonNode] : [];
}

/**
 * 检查JSON格式是否正确
 */
export function checkJson(json: JsonNode[]): JsonNode[] {
  if (json?.length) return json;
  return createInitJson();
}
