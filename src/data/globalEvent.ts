/**
 * 全局事件机制
 *
 * At 2023/11/02
 * By TangJiaHui
 */
export type IEventFn = (payload?: any) => void;
export type IEvent = {
  type: any; // 事件类型
  callback: IEventFn; // 事件回调函数
  once?: boolean; // 是否仅监听一次
};

export class EventEmitter {
  private eventMap: Map<any, IEvent[]> = new Map();

  // 注册事件
  public on(type: unknown, callback: IEventFn, once?: boolean) {
    const event: IEvent = {
      type,
      callback,
      once,
    };
    if (!this.eventMap.get(type)) {
      this.eventMap.set(type, []);
    }
    this.eventMap.get(type)?.push?.(event);
  }

  // 注册事件一次（执行一次后销毁）
  public once(type: unknown, callback: IEventFn) {
    this.on(type, callback, true);
  }

  // 触发事件
  public notify(type: unknown, payload: unknown) {
    if (!this.eventMap.get(type)) return;
    const list = this.eventMap.get(type)?.filter((event: IEvent) => {
      event?.callback?.(payload);
      return !event?.once;
    });
    list?.length ? this.eventMap.set(type, list) : this.eventMap.delete(type);
  }

  // 移除事件。(不传callback移出type的所有回调事件)
  public remove(type: unknown, callback?: IEventFn) {
    if (!this.eventMap.get(type)) return;
    if (callback) {
      const list = this.eventMap.get(type)?.filter((event: IEvent) => {
        return event.callback !== callback;
      });
      list?.length ? this.eventMap.set(type, list) : this.eventMap.delete(type);
    } else {
      this.eventMap.delete(type);
    }
  }
}

export const globalEvent = new EventEmitter();
