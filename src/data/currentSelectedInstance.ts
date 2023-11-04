/**
 * 当前选中实例
 *
 * At 2023/11/01
 * By TangJiaHui
 */
import type { Instance } from './currentInstances';

interface CurrentSelectedInstance {
  // 设置当前选中实例
  set: (ins?: Instance) => void;
  // 清空当前选中实例
  clear: () => void;
  // 获取当前选中实例
  get: () => Instance | undefined;
  // 是否已经选中
  isSelected: (id?: string) => boolean;
  // 是否未选中
  isNotSelected: (id?: string) => boolean;
}

let ins: Instance | undefined;
export const currentSelectedInstance: CurrentSelectedInstance = {
  set(newIns?: Instance) {
    ins = newIns;
  },
  clear() {
    ins = undefined;
  },
  get(): Instance | undefined {
    return ins;
  },
  isSelected(id?: string): boolean {
    return ins?.id === id;
  },
  isNotSelected(id?: string): boolean {
    return ins?.id !== id;
  },
};
