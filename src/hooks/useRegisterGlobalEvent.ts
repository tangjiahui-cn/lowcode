import { useEffect } from 'react';
import { globalEvent, IEventFn } from '../data';

/**
 * 注册全局事件hooks
 *
 * At 2023/11/03
 * By TangJiaHui
 */
export function useRegisterGlobalEvent(event: any, callback: IEventFn | IEventFn[]) {
  useEffect(() => {
    const list = Array.isArray(callback) ? callback : [callback];
    list.forEach((cb) => globalEvent.on(event, cb));
    return () => {
      list.forEach((cb) => globalEvent.remove(event, cb));
    };
  }, []);
}
