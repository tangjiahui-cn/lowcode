import { Attributes } from './Template';
import { Input, Space } from 'antd';
import React from 'react';
import { AttributesProps, useListenState } from '@/core';
import ICustomSelect from '@/common/ICustomSelect';
import JSONEditor from '@/common/JSONEditor';
import GlobalVariableSelect from '@/common/GlobalVariableSelect';
import ColumnsBlock from './components/ColumnsBlock';

interface IProps {
  style?: React.CSSProperties;
  labelWidth?: string | number;
  label?: React.ReactNode;
  labelStyle?: React.CSSProperties;
  childrenStyle?: React.CSSProperties;
  children?: React.ReactNode;
}

function Item(props: IProps) {
  return (
    <div style={{ width: '100%', display: 'flex', alignItems: 'center', ...props?.style }}>
      <div style={{ width: props?.labelWidth, ...props?.labelStyle }}>{props?.label}：</div>
      <div style={{ flex: 1, ...props?.childrenStyle }}>{props?.children}</div>
    </div>
  );
}

/**
 * 属性面板
 */
const labelWidth = 90;
export default function (props: AttributesProps<Attributes>) {
  const [attributes, setAttributes, attributesRef] = useListenState<Attributes>(props.attributes);

  function handleChange(attributes: Attributes) {
    setAttributes(attributes);
    props?.onChange?.(attributes);
  }

  function updateAttributes(value: { [K: string]: any }) {
    handleChange({
      ...attributesRef.current,
      ...value,
    });
  }

  function updateAttributesDataSource(value: { [K: string]: any }) {
    updateAttributes({
      dataSource: {
        ...attributesRef?.current?.dataSource,
        ...value,
      },
    });
  }

  function updateAttributesDataSourceApi(value: { [K: string]: any }) {
    updateAttributesDataSource({
      api: {
        ...attributesRef?.current?.dataSource?.api,
        ...value,
      },
    });
  }

  return (
    <Space style={{ width: '100%' }} direction={'vertical'}>
      <Item label={'标题'} labelWidth={labelWidth}>
        <Input
          style={{ flex: 1 }}
          value={attributes?.title}
          placeholder={'请输入'}
          onChange={(e) => {
            updateAttributes({
              title: e.target.value,
            });
          }}
        />
      </Item>
      <Item label={'列设置'} labelWidth={labelWidth} style={{ alignItems: 'flex-start' }}>
        <ColumnsBlock
          value={attributes?.columns}
          onChange={(columns) => {
            updateAttributes({
              columns,
            });
          }}
        />
      </Item>

      <b>数据源</b>
      <Item label={'数据来源'} labelWidth={labelWidth}>
        <ICustomSelect
          style={{ width: '100%' }}
          value={attributes?.dataSource?.type || 'custom'}
          requestFn={async () => [
            { label: '自定义', value: 'custom' },
            { label: '请求接口', value: 'api' },
          ]}
          onChange={(type: any) => {
            updateAttributesDataSource({
              type,
              api: undefined,
              data: undefined,
            });
          }}
        />
      </Item>
      {(!attributes?.dataSource?.type || attributes?.dataSource?.type === 'custom') && (
        <>
          <Item
            label={'列表数据'}
            labelWidth={labelWidth}
            style={{
              alignItems: 'flex-start',
            }}
          >
            <div style={{ width: 227, height: 200 }}>
              <JSONEditor
                defaultValue={attributes?.dataSource?.data || []}
                onChange={(data) => {
                  updateAttributesDataSource({
                    data: data || [],
                  });
                }}
              />
            </div>
          </Item>
        </>
      )}
      {attributes?.dataSource?.type === 'api' && (
        <>
          <Item label={'地址'} labelWidth={labelWidth}>
            <Input
              placeholder={'请输入'}
              value={attributes?.dataSource?.api?.url}
              onChange={(e) => {
                updateAttributesDataSourceApi({
                  url: e.target?.value,
                });
              }}
            />
          </Item>
          <Item label={'方法'} labelWidth={labelWidth}>
            <ICustomSelect
              style={{ width: '100%' }}
              value={attributes?.dataSource?.api?.method || 'GET'}
              requestFn={async () =>
                ['GET', 'POST', 'DELETE', 'PUT'].map((x) => ({ label: x, value: x }))
              }
              onChange={(method: any) => {
                updateAttributesDataSourceApi({
                  method,
                });
              }}
            />
          </Item>
          <Item label={'参数'} labelWidth={labelWidth} style={{ alignItems: 'flex-start' }}>
            <Space style={{ width: '100%' }} direction={'vertical'}>
              <ICustomSelect
                value={attributes?.dataSource?.api?.paramsType || 'custom'}
                style={{ width: '100%' }}
                requestFn={async () => [
                  { label: '自定义', value: 'custom' },
                  { label: '全局变量', value: 'globalVar' },
                ]}
                onChange={(paramsType: any) => {
                  updateAttributesDataSourceApi({
                    paramsType,
                    params: undefined,
                  });
                }}
              />
              {(!attributes?.dataSource?.api?.paramsType ||
                attributes?.dataSource?.api?.paramsType === 'custom') && (
                <div style={{ height: 150, width: '100%' }}>
                  <JSONEditor
                    defaultValue={(attributes?.dataSource?.api?.params as any) || {}}
                    onChange={(params) => {
                      updateAttributesDataSourceApi({
                        params,
                      });
                    }}
                  />
                </div>
              )}
              {attributes?.dataSource?.api?.paramsType === 'globalVar' && (
                <GlobalVariableSelect
                  style={{ width: '100%' }}
                  value={attributes?.dataSource?.api?.params as any}
                  onChange={(vId) => {
                    updateAttributesDataSourceApi({
                      params: vId,
                    });
                  }}
                />
              )}
            </Space>
          </Item>
          <Item label={'参数解析'} style={{ alignItems: 'flex-start' }} labelWidth={labelWidth}>
            <Input.TextArea
              value={attributes?.dataSource?.api?.parser}
              placeholder={'请输入'}
              autoSize={{
                minRows: 4,
              }}
              onChange={(e) => {
                updateAttributesDataSourceApi({
                  parser: e.target.value,
                });
              }}
            />
          </Item>
        </>
      )}
    </Space>
  );
}
