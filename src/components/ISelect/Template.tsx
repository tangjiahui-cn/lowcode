import { useEffect, useRef, useState } from 'react';
import { engine, getEvent, TemplateProps, useExpose } from '../../core';
import { Select } from 'antd';

export interface Attributes {
  value?: string; // 选中值
  options?: {
    // 选项
    label: string;
    value: string;
  }[];
}

/**
 * 组件模板
 *
 * 组件内部不负责处理复杂逻辑，只管理 attributes
 */
export default function (props: TemplateProps<Attributes, HTMLDivElement>) {
  const domRef = useRef<HTMLDivElement>(null);
  const [attributes, setAttributes] = useState(props?.attributes);
  useEffect(() => setAttributes(props?.attributes), [props?.attributes]);

  useExpose([
    {
      id: props?.id,
      eventType: 'setValue',
      callback: (value) =>
        setAttributes((attributes) => {
          return {
            ...attributes,
            value,
          };
        }),
    },
  ]);

  useEffect(() => {
    props?.getDomFn?.(() => domRef.current);
  }, []);

  return (
    <div
      ref={domRef}
      style={{
        display: 'inline-block',
        ...engine.styleProcessor.getWrapStyle(props?.styleData), // 包裹容器仅仅用于设置定位、布局
      }}
    >
      {/*// 内部容器用于设置其他样式*/}
      <Select
        style={{
          width: '100%',
          ...engine.styleProcessor.getDisplayStyle(props?.styleData),
        }}
        value={attributes?.value}
        options={attributes?.options}
        placeholder={'请输入'}
        {...getEvent(props?.events, {
          onChange(payload: any) {
            setAttributes({
              ...attributes,
              value: payload,
            });
            // 触发事件
            engine.event.trigger({
              id: props?.id,
              eventType: 'change',
              payload,
            });
          },
        })}
      />
    </div>
  );
}
