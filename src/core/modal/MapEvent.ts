/**
 * 具有双重映射的map事件管理模型
 *
 * At 2023/11/08
 * By TangJiaHui
 */
import { BaseEvent, BaseEventCallBack } from './BaseEvent';

export class MapEvent<T = any> {
  private map = new Map<string, BaseEvent<T>>();

  // 监听事件
  public on(key: string, eventKey?: string, callback?: BaseEventCallBack<T>, once?: boolean) {
    const event = this.map.get(key) || new BaseEvent<T>();
    event.on(eventKey, callback, once);
    this.map.set(key, event);
  }

  // 监听事件（执行一次后销毁）
  public once(key: string, eventKey?: string, callback?: BaseEventCallBack<T>) {
    const event = this.map.get(key) || new BaseEvent<T>();
    event.on(eventKey, callback, true);
    this.map.set(key, event);
  }

  // 发布变更
  public notify(key: string, eventKey?: string, payload?: T) {
    const event = this.map.get(key);
    if (event) {
      event.notify(eventKey, payload);
    }
  }

  // 删除一个事件
  public remove(key: string, eventKey?: string, callback?: BaseEventCallBack<T>) {
    const event = this.map.get(key);
    if (event) {
      event.remove(eventKey, callback);
    }
  }

  // 删除一个key对应的所有事件
  public removeKey(key: string) {
    this.map.delete(key);
  }

  // 清空
  public clear() {
    this.map.clear();
  }
}
