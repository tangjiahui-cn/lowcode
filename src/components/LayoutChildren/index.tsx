import { Input } from 'antd';
import { AttributesProps, Component, cType, engine, TemplateProps } from '@/core';
import { useEffect, useRef } from 'react';

interface AttributesType {
  value: string; // 按钮内容
}

export default {
  cId: 'layoutChildren',
  cType: cType.LayoutChildren,
  cName: 'Layout-children',
  icon: undefined,
  template: Template,
  attributeTemplate: Attributes,
  isLayoutChildren: true,
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
        height: '100%',
        width: '400px',
        display: 'inline-block',
        verticalAlign: 'middle',
        background: 'whitesmoke',
        overflow: 'hidden',
        color: '#a4a4a4',
        fontSize: 18,
      }}
    >
      {props?.children || (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            border: '1px dashed #e8e8e8',
          }}
        >
          子元素 - 占位
        </div>
      )}
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
