import React, { useEffect, useRef, useState } from 'react';
import { useExpose, TemplateProps, engine } from '@/core';

export interface AttributesType {
  value?: string;
  type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

/**
 * 组件模板
 */
export default function (props: TemplateProps<AttributesType, HTMLDivElement>) {
  const domRef = useRef<HTMLDivElement>(null);
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

  return React.createElement(props?.attributes?.type || 'h1', {
    ref: domRef,
    style: engine.styleProcessor.getStyle(props?.styleData),
    children: attributes?.value,
    ...props?.events,
  });
}
