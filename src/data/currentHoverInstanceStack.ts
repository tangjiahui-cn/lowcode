/**
 * 当前经过实例 - 栈
 *
 * At 2023/11/01
 * By TangJiaHui
 */
import type { Instance } from './currentInstances';

interface CurrentHoverInstanceStack {
  // 插入栈一个实例
  push: (ins?: Instance) => void;
  // 弹出一个实例
  pop: () => Instance | undefined;
  // 获取栈顶实例
  getStackTop: () => Instance | undefined;
  // 清空栈
  clear: () => void;
}

let insStack: Instance[] = [];
export const currentHoverInstanceStack: CurrentHoverInstanceStack = {
  push(ins) {
    if (ins) {
      insStack.push(ins);
    }
  },
  pop() {
    return insStack.pop();
  },
  getStackTop() {
    return insStack[insStack.length - 1];
  },
  clear() {
    insStack = [];
  },
};
