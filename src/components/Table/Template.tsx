import { Table } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useExpose, TemplateProps, engine, useListenState, getEvent } from '@/core';

// 数据源类型
export type DataSource = {
  type: 'custom' | 'api'; // 数据来源类型 （自定义、请求接口）
  data?: any[]; // 自定义数据
  api?: {
    // 请求接口配置
    url?: string; // 地址
    method?: 'GET' | 'POST' | 'DELETE' | 'PUT'; // 请求方法
    params?:
      | {
          // 参数
          [K: string]: any;
        }
      | string; // 参数： 自定义值 | 全局变量id
    paramsType?: 'custom' | 'globalVar'; // 参数类型： 自定义值 | 全局变量
    parser?: string; // 结果解析函数
  };
};

export interface Attributes {
  title: string; // 表格标题
  columns: any[]; // 表格列
  dataSource: DataSource; // 数据源
}

/**
 * 组件模板
 */
export default function (props: TemplateProps<Attributes, HTMLDivElement>) {
  const domRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<any[]>([]);

  const [attributes] = useListenState<Attributes | undefined>(props?.attributes);

  function getParams() {
    switch (attributes?.dataSource?.api?.paramsType) {
      case 'globalVar':
        return engine.variables.getGlobalVar(attributes?.dataSource?.api?.params as string)?.value;
      case 'custom':
      default:
        return attributes?.dataSource?.api?.params || {};
    }
  }

  useEffect(() => {
    switch (attributes?.dataSource?.type) {
      case 'api':
        // 请求接口获取数据
        let params: any = getParams();
        query(params);
        break;
      case 'custom':
      default:
        setDataSource(attributes?.dataSource?.data || []);
        break;
    }
  }, [attributes?.dataSource]);

  function query(params: any) {
    // const api = props?.attributes?.dataSource?.api;
    // eslint-disable-next-line no-console
    console.log('参数:', params);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 300);
    // engine.fetch
    //   .start({
    //     url: api?.url,
    //     params: api?.params as any,
    //     method: api?.method,
    //   })
    //   .then((res) => {
    //     // eslint-disable-next-line no-console
    //     console.log('请求结果：', res);
    //     setDataSource(res);
    //     setLoading(false);
    //   });
  }

  useExpose([
    {
      id: props?.id,
      eventType: 'query',
      callback: query,
    },
  ]);

  useEffect(() => {
    props?.getDomFn?.(() => domRef.current);
  }, []);

  return (
    <div
      ref={domRef}
      style={engine.styleProcessor.getStyle(props?.styleData)}
      {...getEvent(props?.events, {})}
    >
      {props?.attributes?.title && (
        <h2 style={{ textAlign: 'center' }}>{props?.attributes?.title}</h2>
      )}
      <Table loading={loading} dataSource={dataSource} columns={attributes?.columns} />
    </div>
  );
}
