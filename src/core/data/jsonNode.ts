/**
 * 管理全局注册的jsonNode
 */
import { JsonNode } from '../../data';

const map = new Map<string, JsonNode>();
export const jsonNode = {
  // 新增一个node
  add(node?: JsonNode) {
    if (node) {
      map.set(node.id, node);
    }
  },
  //删除一个node
  remove(id?: string) {
    if (id) {
      map.delete(id);
    }
  },
  // 获取注册的所有jsonNode
  getAll(): JsonNode[] {
    return [...map.values()];
  },
  // 获取一个node
  get(id?: string): JsonNode | undefined {
    return id ? map.get(id) : undefined;
  },
  // 清空全部node
  clear() {
    map.clear();
  },
  // 获取上一级父节点
  getParent(id?: string): JsonNode | undefined {
    return jsonNode.get(id);
  },
  // 获取全部的父节点（从上一级父节点到最外层父节点）
  getParents(id?: string): JsonNode[] {
    let node: JsonNode | undefined = jsonNode.get(id);
    let parents: JsonNode[] = [];
    while ((node = jsonNode.get(node?.parentId))) {
      parents.push(node);
    }
    return parents;
  },
  // 获取全部的父节点（从最外侧到当前节点）
  getParentsFromOuter(id?: string): JsonNode[] {
    return jsonNode?.getParents(id).reverse();
  },
};
