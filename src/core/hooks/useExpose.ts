import { useEffect } from 'react';
import { engine, Expose } from '..';

/**
 * 暴露组件内部实例事件
 *
 * At 2023/11/07
 * By TangJiaHui
 */
export function useExpose(exposeList: Expose[]) {
  useEffect(() => {
    const insId = exposeList?.[0]?.id;
    exposeList.forEach((expose) => {
      engine.event.expose(expose);
      engine.event.registerExpose(expose);
    });
    return () => {
      exposeList.forEach((expose) => {
        engine.event.unExpose(expose);
      });
      engine.event.unRegisterExpose(insId);
    };
  }, []);
}
