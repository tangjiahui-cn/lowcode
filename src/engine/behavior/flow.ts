/**
 * flow 流式关系链（端到端）
 *
 * At 2023/12/19
 * By TangJiaHui
 *
 * 说明：流与发布订阅机制区别：
 * * 流：如一条河流，等待事件触发，手动获取当前流数据，并支持中断（可看做n层）
 * * 发布订阅：需要等待事件触发，触发过后不可以获取值（可看做2层）
 */

import { BehaviorId, NotifyPayload } from '.';
import { Flow, FlowCallback } from '../model';
import { useEffect } from 'react';

const flow = new Flow<BehaviorId, NotifyPayload | undefined>();

// 开启一个流
export const startFlow = flow.start.bind(flow);
// 监听一个流
export const listenFlow = flow.listen.bind(flow);
// 取消监听一个流
export const unListenFlow = flow.unListen.bind(flow);
// 拦截流（可以中断）
export const hookFlow = flow.hook.bind(flow);
// 结束流（关闭后，其他拦截、监听都无法获取到）
export const endFlow = flow.end.bind(flow);

/**************** react-hooks **************/
// 监听一个流
export function useFlow(id: BehaviorId, callback: FlowCallback) {
  useEffect(() => {
    listenFlow(id, callback);
    return () => {
      unListenFlow(id, callback);
    };
  }, []);
}
