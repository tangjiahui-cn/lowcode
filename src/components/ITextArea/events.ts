// 暴露事件
import { ComEvent } from '../../data';

export type ExposeEvents = 'setValue'; // 设置按钮值
export const exposeEvents: ComEvent<ExposeEvents>[] = [
  { eId: 'setValue', eName: '修改input value值' },
];

// 触发事件
export type TriggerEvents = 'change'; // 点击事件
export const triggerEvents: ComEvent<TriggerEvents>[] = [{ eId: 'change', eName: '值变更' }];
