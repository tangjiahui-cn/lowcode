/**
 * 窗口大小调整
 *
 * At 2023/12/19
 * By TangJiaHui
 */
import { useCallback, useEffect } from 'react';

export function useWindowResize(callback: (e: any) => void) {
  const callBackCache = useCallback(callback, []);
  useEffect(() => {
    window.addEventListener('resize', callBackCache);
    return () => {
      window.removeEventListener('resize', callBackCache);
    };
  }, []);
}
