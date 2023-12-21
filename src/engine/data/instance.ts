/**
 * 管理实例（运行时）
 *
 * At 2023/12/11
 * By TangJiaHui
 */
import { Instance, JsonNode } from '..';

// 运行时 - 实例类
export class InstanceClass {
  // 实例注册中心
  private data = new Map<string | undefined, Instance>();
  // 拖拽中实例
  private draggingInstance: Instance | undefined;
  // 选中实例
  private selectedInstances: Instance[] = [];
  // 经过栈
  private hoverStackInstances: Instance[] = [];
  // 当前经过实例
  private currentHoverInstance: Instance | undefined;

  // 注册实例
  register(instance: Instance) {
    this.data.set(instance.id, instance);
  }
  // 删除一个实例
  unRegister(instanceId?: string) {
    this.data.delete(instanceId);
  }
  // 获取一个实例
  get(id?: string): Instance | undefined {
    return this.data.get(id);
  }
  // 获取全部实例
  getAll(): Instance[] {
    return [...this.data.values()];
  }
  // 获取父实例
  getParent(id?: string): Instance | undefined {
    const parentId: string | undefined = this.get(id)?.parentId;
    return this.get(parentId);
  }
  // 获取实例对应jsonNode
  getJsonNode(id?: string): JsonNode | undefined {
    return this.get(id)?.jsonNode;
  }
  // 获取最近的父jsonNode
  getParentJsonNode(id?: string): JsonNode | undefined {
    return this.getParent(id)?.jsonNode;
  }
  // 获取所有父jsonNode（默认从最靠近到最外层）
  getAllParentJsonNode(id?: string, isReverse?: boolean): JsonNode[] {
    const parentJsonNodes: JsonNode[] = [];
    let node: JsonNode | undefined;
    while ((node = this.getParentJsonNode(id))) {
      id = node.id;
      parentJsonNodes.push(node);
    }
    return isReverse ? parentJsonNodes?.reverse() : parentJsonNodes;
  }
  /************************ 拖拽实例 **********************/
  // 清空拖拽实例
  clearDragging() {
    this.draggingInstance = undefined;
  }
  // 设置拖拽中实例
  setDragging(instance?: Instance) {
    this.draggingInstance = instance;
  }
  // 获取拖拽中实例
  getDragging(): Instance | undefined {
    return this.draggingInstance;
  }
  // 判断指定实例是否正在拖拽
  isDragging(id?: string): boolean {
    return this.draggingInstance ? id === this.draggingInstance?.id : false;
  }
  // 判断指定实例是否是拖拽实例的父节点
  isDraggingParent(id?: string): boolean {
    return this.draggingInstance ? this.draggingInstance.parentId === id : false;
  }
  /************************ 选中实例 **********************/
  // 添加到选中实例
  addSelected(instance: Instance): void {
    this.selectedInstances.push(instance);
  }
  // 重新设置选中实例
  setSelected(instances: Instance[]): void {
    this.selectedInstances = instances;
  }
  // 清空选中实例
  clearSelected(): void {
    this.selectedInstances = [];
  }
  // 获取选中实例
  getSelected(): Instance[] {
    return this.selectedInstances;
  }
  // 判断实例是否是选中实例
  isSelected(id?: string): boolean {
    return id ? !!this.selectedInstances?.find((ins) => ins.id === id) : false;
  }
  // 判断实例是否是非选中实例
  isNotSelected(id?: string): boolean {
    return id ? !this.isSelected(id) : false;
  }
  /************************ 经过实例栈 **********************/
  // 加入实例经过栈
  pushHoverStack(instance: Instance | undefined) {
    if (instance) {
      this.hoverStackInstances.push(instance);
    }
  }
  // 弹出实例经过栈
  popHoverStack(): Instance | undefined {
    return this.hoverStackInstances.pop();
  }
  // 获取实例经过栈栈顶
  getHoverStackTop() {
    return this.hoverStackInstances[this.hoverStackInstances.length - 1];
  }
  // 清空实例经过栈
  clearHoverStack() {
    this.hoverStackInstances = [];
  }
  // 获取实例经过栈
  getHoverStack() {
    return this.hoverStackInstances;
  }
  /************************ 当前经过实例 **********************/
  // 获取当前经过实例
  getCurrentHoverInstance(): Instance | undefined {
    return this.currentHoverInstance;
  }
  // 设置当前经过实例
  setCurrentHoverInstance(instance?: Instance): void {
    this.currentHoverInstance = instance;
  }
  // 清空当前经过实例
  clearCurrentHoverInstance(): void {
    this.currentHoverInstance = undefined;
  }
  // 是否是当前经过实例
  isCurrentHoverInstance(id?: string): boolean {
    return id ? id === this.currentHoverInstance?.id : false;
  }
  // 是否不是当前经过实例
  isNotCurrentHoverInstance(id?: string): boolean {
    return id ? !this.isCurrentHoverInstance(id) : false;
  }
}
