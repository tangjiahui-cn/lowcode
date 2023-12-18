import { Dispatch, MutableRefObject, SetStateAction, useEffect, useRef, useState } from 'react';

/**
 * 监听初始值变化，触发值变化
 *
 * At 2023/12/02
 * By TangJiaHui
 */
export function useListenState<S>(
  initialState: S,
): [S, Dispatch<SetStateAction<S>>, MutableRefObject<S>] {
  const [value, setValue] = useState<S>(initialState);
  const valueRef = useRef<S>(initialState);
  valueRef.current = value;

  useEffect(() => {
    setValue(initialState);
  }, [initialState]);

  return [value, setValue, valueRef];
}
