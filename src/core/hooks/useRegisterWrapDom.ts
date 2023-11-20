import { useEffect, useRef } from 'react';
import { engine } from '..';
import { css } from 'class-css';

export interface Size {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface WrapDomIns {
  mount: (size: Size) => void;
  unMount: () => void;
}

export function useRegisterWrapDom(container = document.body) {
  const div = useRef<HTMLDivElement>();
  const ins = useRef<WrapDomIns>({
    mount,
    unMount,
  });

  function mount(size: Size) {
    if (!div.current) {
      lazyMount();
    }
    const dom: any = div.current;
    dom.style.width = `${size.width}px`;
    dom.style.height = `${size.height}px`;
    dom.style.left = `${size.x}px`;
    dom.style.top = `${size.y}px`;
  }

  function unMount() {
    if (!div.current) return;
    container.removeChild(div.current);
    div.current = undefined;
  }

  function lazyMount() {
    div.current = document.createElement('div');
    div.current.className = css({
      position: 'fixed',
      borderLeft: '4px solid red',
      pointerEvents: 'none',
    });
    container.appendChild(div.current);
  }

  useEffect(() => {
    engine.runtime.useShowWrapIns?.({
      mount,
      unMount,
    });
    return engine.runtime.unUseShowWrapIns;
  }, []);

  return ins;
}
