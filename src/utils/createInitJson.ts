import { currentComponents, JsonNode } from '../data';
import { createJsonNode } from './createJsonNode';

/**
 * 创建一个包含初始Page的JSON
 */
export function createInitJson(): JsonNode[] {
  const component = currentComponents.getComponent('i-page');
  if (!component) {
    throw new Error('page component is not found.');
  }
  return [createJsonNode(component)];
}

/**
 * 检查JSON格式是否正确
 */
export function checkJson(json: JsonNode[]): JsonNode[] {
  if (json?.length) return json;
  return createInitJson();
}
