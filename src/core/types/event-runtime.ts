// 暴露规则
import { CallbackType } from '../data';

export type ExposeRule = {
  rId: string; // 规则id
  id: string; // 实例id
  name?: string; // 暴露规则名称
  eventType?: string; // 暴露实例内部规则
};

// 触发规则 - 目标规则
export type TriggerRuleTo = Omit<ExposeRule, 'rId' | 'id'> & {
  targetId: string; // 目标规则记录id
  rId?: string; // 规则id
  id?: string; // 实例id
};

// 触发规则携带参数
export type TriggerRulePayloadType = 0 | 1 | 2; // 0默认 1全局变量 2自定义
export type TriggerRulePayload = {
  type: TriggerRulePayloadType; // 携带参数类型
  value: any;
};

// 组件改变 -> 修改全局变量 、修改下拉框
// 重置按钮 -> 重置下拉框、修改全局变量

// 触发规则
export type TriggerRule = {
  rId: string; // 规则id
  id: string; // 实例id
  name?: string; // 触发规则名称
  eventType?: string; // 触发事件
  payload?: string; // 携带参数
  to?: TriggerRuleTo[]; // 发布到暴露事件
};

// 暴露事件
export type Expose = {
  id: string; // 实例id
  eventType: string; // 暴露事件类型
  callback: CallbackType; // 回调事件
};

// 触发事件
export type Trigger = {
  id: string; // 实例id
  eventType: string; // 触发事件类型
  payload?: any; // 触发内容
};
