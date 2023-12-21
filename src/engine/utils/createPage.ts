/**
 * 创建一个新的页面JSON
 *
 * At 2023/12/11
 * By TangJiaHui
 */
import { createJsonNode, JsonNode, runtime } from '..';

export function createPage(): JsonNode[] {
  const page = runtime.components.getPageComponent();
  if (!page) {
    throw new Error('page component is not register.');
  }
  return [createJsonNode(page)];
}
