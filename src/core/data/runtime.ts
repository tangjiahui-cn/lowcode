import { JsonNode, WrapDomIns } from '..';

export type ContainerChildrenItem = {
  id: string;
  info?: DOMRect;
};
export type ContainerChildren = ContainerChildrenItem[];

/**
 * 运行时变量
 *
 * At 2023/11/20
 * By TangJiaHui
 */

type Runtime = {
  clearDragJsonNode: () => void; // 清空拖拽节点
  setDragJsonNode: (jsonNode: JsonNode) => void; // 设置拖拽节点
  getDragJsonNode: () => JsonNode | undefined; // 获取拖拽节点
  isDragJsonNode: (id?: string) => boolean; // 是否正在拖拽目标节点
  setDragOnContainerChildren: (containerChildren: ContainerChildren) => void; // 设置拖拽位于容器上方时内部的children信息
  getDragOnContainerChildren: () => ContainerChildren; // 获取拖拽位于容器上方时内部的children信息

  // 浮层提示框
  useShowWrapIns?: (ins: WrapDomIns) => void; // 使用包裹浮层实例
  unUseShowWrapIns?: () => void; // 取消使用
  showWrap: (size?: DOMRect) => void; // 显示包裹浮层
  unShowWrap: () => void; // 隐藏包裹浮层

  setInsertTargetId: (id?: string) => void; // 设置插入目标节点id（待插入目标节点之前）
  getInsertTargetId: () => string | undefined; // 获取插入目标节点id
};

type RuntimeData = {
  dragJsonNode?: JsonNode; // 拖拽中的jsonNode
  containerChildren?: ContainerChildren; // 拖拽鼠标经过容器上方，容器内部子节点信息
  wrapDomIns?: WrapDomIns;
  targetId?: string;
};

const data: RuntimeData = {};
export const runtime: Runtime = {
  clearDragJsonNode() {
    data.dragJsonNode = undefined;
  },
  setDragJsonNode(jsonNode: JsonNode) {
    data.dragJsonNode = jsonNode;
  },
  getDragJsonNode() {
    return data.dragJsonNode;
  },
  isDragJsonNode(id?: string) {
    return data?.dragJsonNode?.id === id;
  },
  setDragOnContainerChildren(containerChildren: ContainerChildren) {
    data.containerChildren = containerChildren;
  },
  getDragOnContainerChildren() {
    return data?.containerChildren || [];
  },
  useShowWrapIns(ins: WrapDomIns) {
    data.wrapDomIns = ins;
  },
  unUseShowWrapIns() {
    data.wrapDomIns = undefined;
  },
  showWrap(size?: DOMRect) {
    if (!size) return;
    data.wrapDomIns?.mount?.(size);
  },
  unShowWrap() {
    data.wrapDomIns?.unMount?.();
  },
  setInsertTargetId(id?: string) {
    if (id) {
      data.targetId = id;
    }
  },
  getInsertTargetId() {
    return data?.targetId;
  },
};
