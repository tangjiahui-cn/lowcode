import { useEffect } from 'react';
import { engine } from '../core';

/**
 * 注册全局事件hooks
 *
 * At 2023/11/03
 * By TangJiaHui
 */
export function useRegisterGlobalEvent(event: any, callback: (payload: any) => void) {
  useEffect(() => {
    const list = Array.isArray(callback) ? callback : [callback];
    list.forEach((cb) => engine.globalEvent.on(event, cb));
    return () => {
      list.forEach((cb) => engine.globalEvent.remove(event, cb));
    };
  }, []);
}
