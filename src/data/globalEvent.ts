/**
 * 全局事件机制
 *
 * At 2023/11/02
 * By TangJiaHui
 */
export type IEventFn = (payload?: any) => void;
export type IEvent = {
  type: any;  // 事件类型
  callback: IEventFn; // 事件回调函数
  once?: boolean; // 是否仅监听一次
}

export interface GlobalEvent {
  // 注册监听事件
  on: (type: unknown, callback: IEventFn, once?: boolean) => void;
  // 注册监听事件 (执行一次后销毁）
  once: (type: unknown, callback: IEventFn) => void;
  // 发布事件
  notify: (type: unknown, payload: unknown) => void;
  // 移除事件。(不传callback移出type的所有回调事件)
  remove: (type: unknown, callback?: IEventFn) => void;
}

export const globalEvent: GlobalEvent = (() => {
  const eventMap: Map<any, IEvent[]> = new Map();

  function on (type: unknown, callback: IEventFn, once?: boolean) {
    const event: IEvent = {
      type,
      callback,
      once
    }
    if (!eventMap.get(type)) {
      eventMap.set(type, [])
    }
    eventMap.get(type)?.push?.(event)
  }

  function once (type: unknown, callback: IEventFn) {
    on(type, callback, true);
  }

  function notify (type: unknown, payload: unknown) {
    if (!eventMap.get(type)) return;
    const list = eventMap.get(type)?.filter((event: IEvent) => {
      event?.callback?.(payload);
      return !event?.once
    })
    list?.length
      ? eventMap.set(type, list)
      : eventMap.delete(type)
  }

  function remove (type: unknown, callback?: IEventFn) {
    if (!eventMap.get(type)) return;
    if (callback) {
      const list = eventMap.get(type)?.filter((event: IEvent) => {
        return event.callback !== callback;
      })
      list?.length
        ? eventMap.set(type, list)
        : eventMap.delete(type)
    } else {
      eventMap.delete(type)
    }
  }

  return {
    on,
    notify,
    once,
    remove
  }
})()
