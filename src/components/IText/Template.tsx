import { TemplateProps } from '../../data';
import { useEffect, useRef } from 'react';

export interface Attributes {
  value: string;
}

/**
 * 组件模板
 */
export default function (props: TemplateProps<Attributes, HTMLSpanElement>) {
  const domRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    props?.getDomFn?.(() => domRef.current);
  }, []);

  return (
    <span ref={domRef} style={props?.style} {...props?.events}>
      {props?.attributes?.value}
    </span>
  );
}
