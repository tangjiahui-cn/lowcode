import { Input, Menu } from 'antd';
import { AttributesProps, Component, cType, engine, TemplateProps } from '@/core';
import { useEffect, useRef } from 'react';
import { DingtalkOutlined } from '@ant-design/icons';

interface AttributesType {
  value: string; // 按钮内容
}

export default {
  cId: 'menu',
  cType: cType.Base,
  cName: '菜单',
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
        height: '100%',
        width: 150,
        display: 'inline-table',
        background: 'rgba(3, 21, 41)',
        verticalAlign: 'middle'
      }}
    >
      <div
        style={{
          height: 48,
          color: 'white',
          fontWeight: 'bold',
          userSelect: 'none',
          lineHeight: '48px',
          textAlign: 'center',
          letterSpacing: 2,
          fontSize: 16,
        }}
      >
        <DingtalkOutlined style={{ marginRight: 6 }} />
        桩桩管理平台
      </div>
      <Menu
        mode='inline'
        theme='dark'
        selectedKeys={['1']}
        items={[
          { label: '菜单一', key: '1' },
          { label: '菜单二', key: '2' },
          { label: '菜单三', key: '3' },
        ]}
      />
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
