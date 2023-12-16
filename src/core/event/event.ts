import { BaseEvent, MapEvent } from '@/core/modal';
import { Expose, RegisterEvent, Trigger } from '@/core';
import { doneEventStep } from '@/core/event/utils';

type Data = {
  [K: Expose['id']]: Expose[];
};

export class Event extends BaseEvent {
  // 实例事件控制
  instanceEvent = new MapEvent();

  // 实例注册事件
  data: Data = {};

  // 实例内部暴露事件 (监听实例内部事件)
  expose(expose: Expose) {
    this.instanceEvent.on(expose.id, expose.eventType, expose.callback);
  }

  // 实例内部取消暴露事件
  unExpose(expose: Expose) {
    this.instanceEvent.remove(expose.id, expose.eventType, expose.callback);
  }

  // 实例内部触发事件 （触发 -> 触发事件规则）
  trigger(trigger: Trigger) {
    // 发布到实例事件变更
    this.instanceEvent.notify(trigger.id, trigger.eventType, trigger.payload);
  }

  // 注册绑定事件
  registerEvent(events?: RegisterEvent[]) {
    if (!events?.length) return;
    // 监听实例触发事件
    events.forEach((event) => {
      this.instanceEvent.on(event.id, event.eventType, (payload) => {
        event.steps?.forEach((step) => {
          doneEventStep(step, payload);
        });
      });
    });
  }

  // 取消注册绑定事件
  unRegisterEvent(events?: RegisterEvent[]) {
    if (!events?.length) return;
    events.forEach((event) => {
      this.instanceEvent.removeKey(event.id);
    });
  }

  // 注册一个暴露事件
  registerExpose(expose: Expose) {
    (this.data[expose.id] || (this.data[expose.id] = [])).push(expose);
  }

  // 取消注册实例所有的暴露事件
  unRegisterExpose(insId?: string) {
    insId && delete this.data[insId];
  }

  // 获取实例的所有注册暴露事件
  getRegisterExposeList(insId?: string) {
    if (!insId) return [];
    return this.data[insId];
  }
}
