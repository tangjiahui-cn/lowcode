// 暴露事件
import { ComEvent } from '../../data';

export type ExposeEvents = 'setValue'; // 设置按钮值
export const exposeEvents: ComEvent<ExposeEvents>[] = [{ eId: 'setValue', eName: '修改value值' }];

// 触发事件
export type TriggerEvents = 'click'; // 点击事件
export const triggerEvents: ComEvent<TriggerEvents>[] = [{ eId: 'click', eName: '点击事件' }];
