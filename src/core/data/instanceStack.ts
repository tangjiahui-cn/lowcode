/**
 * 鼠标经过实例栈
 *
 * At 2023/12/11
 * By TangJiaHui
 */
import { Instance } from '@/core';

let stack: Instance[] = [];
export const instanceStack = {
  push(instance: Instance | undefined) {
    if (instance) {
      stack.push(instance);
    }
  },
  pop(): Instance | undefined {
    return stack.pop();
  },
  getStackTop() {
    return stack[stack.length - 1];
  },
  clear() {
    stack = [];
  },
  get() {
    return stack;
  },
};
