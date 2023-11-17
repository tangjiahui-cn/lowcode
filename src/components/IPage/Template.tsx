import { engine, TemplateProps } from '../../core';
import { useEffect, useRef } from 'react';

export interface Attributes {
  title: string;
}

/**
 * 组件模板
 */
export default function (props: TemplateProps<Attributes, HTMLDivElement>) {
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    props?.getDomFn?.(() => domRef.current);
  }, []);

  return (
    <div
      ref={domRef}
      style={{
        position: 'relative',
        height: '100%',
        width: '100%',
        overflowY: 'auto',
        background: 'white',
        ...engine.styleProcessor.getStyle(props?.styleData),
      }}
      {...props?.events}
    >
      {props?.attributes?.title && <h1>{props?.attributes?.title}</h1>}
      {props?.children}
    </div>
  );
}
