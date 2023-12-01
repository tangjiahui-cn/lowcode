/**
 * 当前实例的内部事件管理
 *
 * At 2023/11/30
 * By TangJiaHui
 */
import { Expose } from './event';

const data: {
  [K: Expose['id']]: Expose[];
} = {};
export const currentInstanceEvents = {
  // 注册一个暴露事件
  registerExpose(expose: Expose) {
    (data[expose.id] || (data[expose.id] = [])).push(expose);
  },
  // 取消注册实例所有的暴露事件
  unRegisterExpose(insId?: string) {
    insId && delete data[insId];
  },
  // 获取实例的所有注册暴露事件
  getRegisterExposeList(insId?: string) {
    if (!insId) return [];
    return data[insId];
  },
};
