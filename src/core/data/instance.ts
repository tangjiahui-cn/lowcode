/**
 * 管理实例（运行时）
 *
 * At 2023/12/11
 * By TangJiaHui
 */
import { Instance, JsonNode } from '..';

const data = new Map<string | undefined, Instance>();
let draggingInstance: Instance | undefined;
export const instance = {
  // 注册实例
  register(instance: Instance) {
    data.set(instance.id, instance);
  },
  // 删除一个实例
  unRegister(instanceId?: string) {
    data.delete(instanceId);
  },
  // 获取一个实例
  get(id?: string): Instance | undefined {
    return data.get(id);
  },
  // 获取全部实例
  getAll(): Instance[] {
    return [...data.values()];
  },
  // 获取父实例
  getParent(id?: string): Instance | undefined {
    const parentId: string | undefined = this.get(id)?.parentId;
    return this.get(parentId);
  },
  // 获取实例对应jsonNode
  getJsonNode(id?: string): JsonNode | undefined {
    return this.get(id)?.jsonNode;
  },
  // 获取最近的父jsonNode
  getParentJsonNode(id?: string): JsonNode | undefined {
    return this.getParent(id)?.jsonNode;
  },
  // 获取所有父jsonNode（默认从最靠近到最外层）
  getAllParentJsonNode(id?: string, isReverse?: boolean): JsonNode[] {
    const parentJsonNodes: JsonNode[] = [];
    let node: JsonNode | undefined;
    while ((node = this.getParentJsonNode(id))) {
      id = node.id;
      parentJsonNodes.push(node);
    }
    return isReverse ? parentJsonNodes?.reverse() : parentJsonNodes;
  },
  // 清空拖拽实例
  clearDragging() {
    draggingInstance = undefined;
  },
  // 设置拖拽中实例
  setDragging(instance?: Instance) {
    draggingInstance = instance;
  },
  // 获取拖拽中实例
  getDragging(): Instance | undefined {
    return draggingInstance;
  },
  // 判断指定实例是否正在拖拽
  isDragging(id?: string): boolean {
    return draggingInstance ? id === draggingInstance?.id : false;
  },
  // 判断指定实例是否是拖拽实例的父节点
  isDraggingParent(id?: string): boolean {
    return draggingInstance ? draggingInstance.parentId === id : false;
  },
};
