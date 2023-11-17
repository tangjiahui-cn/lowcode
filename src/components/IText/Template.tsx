import { useEffect, useRef, useState } from 'react';
import { useExpose, TemplateProps, engine } from '../../core';

export interface Attributes {
  value: string;
}

/**
 * 组件模板
 */
export default function (props: TemplateProps<Attributes, HTMLSpanElement>) {
  const domRef = useRef<HTMLSpanElement>(null);
  const [attributes, setAttributes] = useState(props?.attributes);

  useExpose([
    {
      id: props?.id,
      eventType: 'setValue',
      callback: (payload) => {
        setAttributes({
          ...attributes,
          value: payload,
        });
      },
    },
  ]);

  useEffect(() => {
    setAttributes(props?.attributes);
  }, [props?.attributes]);

  useEffect(() => {
    props?.getDomFn?.(() => domRef.current);
  }, []);

  return (
    <span ref={domRef} style={engine.styleProcessor.getStyle(props?.styleData)} {...props?.events}>
      {attributes?.value}
    </span>
  );
}
