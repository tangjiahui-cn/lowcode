// 开发环境事件拦截
import { DOMAttributes } from 'react';
import { engine } from '@/core';

export function getEvent(
  injectEvent: DOMAttributes<any> = {},
  events: DOMAttributes<any> = {},
): any {
  return engine.runtime.isDev() ? injectEvent : events;
}
