import { JsonNode } from '../data';
import { useEffect } from 'react';
import { engine } from '..';

/**
 * 注册绑定事件函数
 *
 * At 2023/12/1
 */
export function useRegisterEvents(jsonNode?: JsonNode) {
  useEffect(() => {
    engine.event.registerEvent(jsonNode?.events);
    return () => {
      engine.event.unRegisterEvent(jsonNode?.events);
    };
  }, [jsonNode]);
}
