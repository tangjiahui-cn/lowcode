/**
 * 管理jsonNode
 *
 * At 2023/12/11
 * By TangJiaHui
 */
import { JsonNode } from '@/core';

// 存储每个实例的jsonNode
const data = new Map<string, JsonNode>();
// 存储当前操作页面的jsonNode
const currentPage: {
  current: JsonNode[];
} = {
  current: [],
};

// 管理每个实例的jsonNode
export const jsonNode = {
  // 初始化页面jsonNode
  init(page: JsonNode[]) {
    currentPage.current = page;
  },
  // 清空
  clear() {
    currentPage.current = [];
    data.clear();
  },
  // 注册一个jsonNode
  register(jsonNode: JsonNode) {
    data.set(jsonNode.id, jsonNode);
  },
  // 取消注册一个jsonNode
  unRegister(id?: string) {
    data.delete(id || '');
  },
  // 根据id获取jsonNode
  get(id?: string): JsonNode | undefined {
    return data.get(id || '');
  },
  // 获取当前页面page
  getPage(): JsonNode[] {
    return currentPage.current;
  },
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
  },
};
