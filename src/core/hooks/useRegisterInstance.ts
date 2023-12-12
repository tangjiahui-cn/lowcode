/**
 * 注册instance实例
 *
 * At 2023/12/10
 * By TangJiaHui
 */
import { useEffect, useRef } from 'react';
import { engine, Instance } from '@/core';

export function useRegisterInstance(getInstance: () => Instance, effect: any[]) {
  const instanceRef = useRef<Instance>();

  useEffect(() => {
    instanceRef.current = getInstance();
    engine.instance.register(instanceRef.current);
    return () => {
      engine.instance.unRegister(instanceRef.current?.id);
    };
  }, effect);

  return instanceRef;
}
