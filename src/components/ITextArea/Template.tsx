import { Input } from 'antd';
import { getEvent, TemplateProps } from '../../data';
import { useEffect, useRef, useState } from 'react';
import { engine, useExpose } from '../../core';

export interface Attributes {
  value: string;
}

/**
 * 组件模板
 */
export default function (props: TemplateProps<Attributes, HTMLTextAreaElement>) {
  const ref = useRef<any>(null);
  const [attributes, setAttributes] = useState<Attributes | undefined>(props?.attributes);

  useExpose([
    {
      id: props?.id,
      eventType: 'setValue',
      callback: (payload: any) => {
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
    props?.getDomFn?.(() => ref.current?.resizableTextArea?.textArea);
  }, []);

  return (
    <Input.TextArea
      ref={ref}
      style={props?.style}
      placeholder={'请输入'}
      value={attributes?.value}
      onChange={(e) =>
        setAttributes({
          ...attributes,
          value: e.target.value,
        })
      }
      {...getEvent(props?.events, {
        onChange(e: any) {
          const target = {
            ...attributes,
            value: e.target.value,
          };
          setAttributes(target);
          // 触发事件
          engine.event.trigger({
            id: props?.id,
            eventType: 'change',
            payload: e.target.value,
          });
        },
      })}
    >
      {attributes?.value}
    </Input.TextArea>
  );
}
