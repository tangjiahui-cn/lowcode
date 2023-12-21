import { engine, getUrlParams, TemplateProps } from '@/core';
import { useEffect, useRef, useState } from 'react';
import { DingtalkOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

export interface IData {
  key?: string; // 唯一key
  label?: string; // 名称
  route?: string; // 绑定路由地址
}

export interface AttributesType {
  title?: string;
  options: IData[];
}

export default function Template(props: TemplateProps<AttributesType, HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [selectedKeys, setSelectedKeys] = useState<any[]>([]);

  const [options, setOptions] = useState<
    {
      label: string;
      key: string;
    }[]
  >([]);

  function handleSelect(key: string) {
    const item = props?.attributes?.options?.find((x) => x.key === key);
    setSelectedKeys([key]);
    if (!engine.runtime.isDev()) {
      navigate('/preview?route=' + item?.route || '/');
      engine.event.notify('route', item?.route || '/');
    }
  }

  useEffect(() => {
    const { options = [] }: any = props?.attributes;
    setOptions(
      options?.map((x: any) => {
        return {
          key: x?.key,
          label: x?.label,
          route: x?.route,
        };
      }),
    );

    const params = getUrlParams(location.hash || location.search);
    const { route = '' } = params;
    const target = options?.find((x: any) => x?.route === route) || options?.[0];
    if (target) {
      setSelectedKeys([target.key]);
    }
  }, [props?.attributes]);

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
        verticalAlign: 'middle',
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
        {props?.attributes?.title}
      </div>
      <Menu
        mode='inline'
        theme='dark'
        selectedKeys={selectedKeys}
        // items={[
        //   { label: '菜单一', key: '1' },
        //   { label: '菜单二', key: '2' },
        //   { label: '菜单三', key: '3' },
        // ]}
        items={options}
        onSelect={(node) => {
          handleSelect(node?.key);
        }}
      />
    </div>
  );
}
