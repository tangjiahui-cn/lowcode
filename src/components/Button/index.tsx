import { Button, Input } from 'antd';
import { AttributesProps, Component, cType, engine, TemplateProps } from '@/core';
import { useEffect, useRef } from 'react';

interface AttributesType {
  value: string; // 按钮内容
}

export default {
  cId: 'button',
  cType: cType.Base,
  cName: '按钮',
  icon: undefined,
  template: Template,
  attributeTemplate: Attributes,

  defaultAttributes: {
    value: '按 钮',
  },
} as Component<AttributesType>;

function Template(props: TemplateProps<AttributesType, HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    props?.getDomFn?.(() => ref.current);
  }, []);

  return (
    <div
      ref={ref}
      {...props?.events}
      style={{
        ...engine.styleProcessor.getStyle(props?.styleData),
        display: 'inline-block',
        overflow: 'hidden',
      }}
    >
      <Button block style={engine.styleProcessor.getDisplayStyle(props?.styleData)}>
        {props?.attributes?.value || ' '}
      </Button>
    </div>
  );
}

function Attributes(props: AttributesProps<AttributesType>) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        内容：
        <Input
          style={{ flex: 1 }}
          placeholder={'请输入'}
          value={props?.attributes?.value}
          onChange={(e) => {
            const value = e.target.value;
            props?.onChange?.({
              ...props?.attributes,
              value,
            });
          }}
        />
      </div>
    </div>
  );
}
