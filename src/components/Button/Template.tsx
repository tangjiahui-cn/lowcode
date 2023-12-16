import { Button } from 'antd';
import { ButtonType } from 'antd/es/button';
import { useEffect, useRef, useState } from 'react';
import { engine, useExpose, getEvent, TemplateProps } from '@/core';

export interface AttributesType {
  type?: ButtonType;
  value?: string;
}

/**
 * 组件模板
 *
 * 组件内部不负责处理复杂逻辑，只管理 attributes
 */
export default function (props: TemplateProps<AttributesType, HTMLDivElement>) {
  const domRef = useRef<HTMLDivElement>(null);
  const [attributes, setAttributes] = useState(props?.attributes);
  useEffect(() => setAttributes(props?.attributes), [props?.attributes]);

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
    <div
      ref={domRef}
      {...props?.events}
      style={{
        ...engine.styleProcessor.getStyle(props?.styleData),
        display: 'inline-table',
        overflow: 'hidden',
      }}
    >
      <Button
        type={props?.attributes?.type}
        style={{
          ...engine.styleProcessor.getDisplayStyle(props?.styleData),
          height: '100%',
          width: '100%',
        }}
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
        {attributes?.value}
      </Button>
    </div>
  );
}
