/**
 * editor 挂载监听
 *
 * At 2023/12/14
 * By TangJiaHui
 */
import { useEffect } from 'react';
import { engine, EVENT } from '..';

export function useEditorMount(callback: () => void) {
  useEffect(() => {
    engine.event.on(EVENT.editorMount, callback);
    return () => {
      engine.event.remove(EVENT.editorMount, callback);
    };
  });
}
