/**
 * 创建一个新的页面JSON
 *
 * At 2023/12/11
 * By TangJiaHui
 */
import { createJsonNode, engine, JsonNode } from '..';

export function createPage(): JsonNode[] {
  const page = engine.component.getPageComponent();
  if (!page) {
    throw new Error('page component is not register.');
  }
  return [createJsonNode(page)];
}
