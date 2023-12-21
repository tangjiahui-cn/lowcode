/**
 * 管理jsonNode
 *
 * At 2023/12/11
 * By TangJiaHui
 */
import { JsonNode } from '..';

export class JsonNodeClass {
  // 存储每个实例的jsonNode
  private data = new Map<string, JsonNode>();
  // 存储当前操作页面的jsonNode
  private currentPage: {
    current: JsonNode[];
  } = {
    current: [],
  };
  // 设置page
  setPage(page: JsonNode[]) {
    this.currentPage.current = page;
  }
  // 获取当前页面page
  getPage(): JsonNode[] {
    return this.currentPage.current;
  }
  // 清空page
  clearPage() {
    this.currentPage.current = [];
  }

  // 清空
  clear() {
    this.clearPage();
    this.data.clear();
  }
  // 注册一个jsonNode
  register(jsonNode: JsonNode) {
    this.data.set(jsonNode.id, jsonNode);
  }
  // 取消注册一个jsonNode
  unRegister(id?: string) {
    this.data.delete(id || '');
  }
  // 根据id获取jsonNode
  get(id?: string): JsonNode | undefined {
    return this.data.get(id || '');
  }
  // 更新jsonNode
  update(id?: string, jsonNode?: JsonNode) {
    if (!id) {
      throw new Error('id is not exist');
    }
    if (!jsonNode) {
      throw new Error('jsonNode is not exist');
    }
    const src = this.get(id);
    if (!src) {
      throw new Error('source jsonNode is not exist');
    }
    Object.assign(src, jsonNode);
  }
}
