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
    exposeList.forEach((expose) => engine.event.expose(expose));
    return () => {
      exposeList.forEach((expose) => engine.event.unExpose(expose));
    };
  }, []);
}
