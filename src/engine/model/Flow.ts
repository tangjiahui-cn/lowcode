/**
 * 流式结构
 *
 * At 2023/12/20
 * By TangJiaHui
 */
import { BaseEvent, BaseEventCallBack } from '.';

export type FlowCallback = BaseEventCallBack;
export class Flow<T = any, Payload = any> {
  data = new Map<T, Payload | undefined>();
  event = new BaseEvent<T, Payload>();

  // 是否是开启的流
  private isStart(id: T) {
    return this.data.has(id);
  }

  // 获取流的数据
  private getFlowData(id: T) {
    return this.data.get(id);
  }

  // 关闭流
  private closeFlow(id: T) {
    this.data.delete(id);
    this.event.removeKey(id);
  }

  // 开启流
  start(id: T, payload?: Payload) {
    this.data.set(id, payload);
    this.event.notify(id, payload);
  }

  // 监听流
  listen(id: T, callback: BaseEventCallBack<Payload>) {
    this.event.on(id, callback);
  }

  // 取消监听流
  unListen(id: T, callback: BaseEventCallBack<Payload>) {
    if (!this.isStart(id)) return;
    this.event.remove(id, callback);
  }

  // 拦截流
  hook(id: T, callback: BaseEventCallBack<Payload, boolean | void>) {
    if (!this.isStart(id)) return;
    const payload = this.getFlowData(id);
    const result = callback(payload);
    if (typeof result === 'boolean' && !result) {
      this.closeFlow(id);
    }
  }

  // 关闭一条流
  end(id: T, callback: BaseEventCallBack<Payload>) {
    if (!this.isStart(id)) return;
    const payload = this.getFlowData(id);
    callback(payload);
    this.closeFlow(id);
  }
}
