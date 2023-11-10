import { useEffect } from 'react';

type UnmountFunc = (() => void) | void;
export function useEffectOnce(callback: () => UnmountFunc) {
  useEffect(callback, []);
}
