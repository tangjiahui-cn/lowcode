/**
 * 具有双重映射的map事件管理模型
 *
 * At 2023/11/08
 * By TangJiaHui
 */
import { BaseEvent, BaseEventCallBack } from './BaseEvent';

export class MapEvent<K = string, E = string, Payload = any> {
  private map = new Map<K, BaseEvent<E, Payload>>();

  // 监听事件
  public on(key: K, eventKey?: E, callback?: BaseEventCallBack<Payload>, once?: boolean) {
    const event = this.map.get(key) || new BaseEvent<E, Payload>();
    event.on(eventKey, callback, once);
    this.map.set(key, event);
  }

  // 监听事件（执行一次后销毁）
  public once(key: K, eventKey?: E, callback?: BaseEventCallBack<Payload>) {
    const event = this.map.get(key) || new BaseEvent<E, Payload>();
    event.on(eventKey, callback, true);
    this.map.set(key, event);
  }

  // 发布变更
  public notify(key: K, eventKey?: E, payload?: Payload) {
    const event = this.map.get(key);
    if (event) {
      event.notify(eventKey, payload);
    }
  }

  // 删除一个事件
  public remove(key: K, eventKey?: E, callback?: BaseEventCallBack<Payload>) {
    const event = this.map.get(key);
    if (event) {
      event.remove(eventKey, callback);
    }
  }

  // 删除一个key对应的所有事件
  public removeKey(key: K) {
    this.map.delete(key);
  }

  // 清空
  public clear() {
    this.map.clear();
  }
}
