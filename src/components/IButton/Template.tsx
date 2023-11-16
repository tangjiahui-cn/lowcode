import { Button } from 'antd';
import { ButtonType } from 'antd/es/button';
import { useEffect, useRef, useState } from 'react';
import { engine, useExpose, getEvent, TemplateProps } from '../../core';

export interface Attributes {
  type?: ButtonType;
  value?: string;
}

/**
 * 组件模板
 *
 * 组件内部不负责处理复杂逻辑，只管理 attributes
 */
export default function (props: TemplateProps<Attributes, HTMLButtonElement>) {
  const domRef = useRef<HTMLButtonElement>(null);
  const [attributes, setAttributes] = useState(props?.attributes);
  useEffect(() => setAttributes(attributes), [props?.attributes]);

  function setValue(value: string) {
    setAttributes({ ...attributes, value });
  }

  // 暴露事件
  useExpose([
    {
      id: props?.id,
      eventType: 'setValue',
      callback: (payload: any) => {
        setValue(payload);
      },
    },
  ]);

  useEffect(() => {
    props?.getDomFn?.(() => domRef.current);
  }, []);

  return (
    <Button
      ref={domRef}
      style={props?.style}
      type={props?.attributes?.type}
      {...getEvent(props?.events, {
        onClick() {
          // 触发事件
          engine.event.trigger({
            id: props?.id,
            eventType: 'click',
          });
        },
      })}
    >
      {props?.attributes?.value}
    </Button>
  );
}
