import { Form, Input, Space } from 'antd';
import ICustomSelect from '../../../../../components-sys/ICustomSelect';
import { useEffect, useState } from 'react';
import { genEventUuid } from '../../../../../core';

const width = 280;
export const ExposeRuleStepKeys = ['event', 'globalVar', 'open'];
export const ExposeRulePayloadTypeKeys = ['event', 'globalVar', 'custom'];
export interface ExposeRuleStep {
  sId: string; // 步骤id
  type: 'event' | 'globalVar' | 'open' | 'jump'; // 类型：事件、全局变量、打开新页面、跳转地址
  eventType?: string; // 组件内部事件类型（id）
  globalVarId?: string; // 全局变量id
  payloadType: 'default' | 'globalVar' | 'custom'; // payload类型(默认值、全局变量、自定义字符串值)
  payload?: string; // payload值 - (默认携带值、全局变量id、自定义字符串值)
  parser?: string; // payload解析器（函数字符串）
}

export interface ExposeRule {
  rId: string; // 唯一id
  name: string; // 名称
  steps: ExposeRuleStep[]; // 执行步骤
}

export default function () {
  const [form] = Form.useForm();
  const [showFunc, setShowFunc] = useState(false);

  function createExposeRuleStep(): ExposeRuleStep {
    return {
      sId: genEventUuid(),
      type: 'event',
      payloadType: 'default',
      parser: 'x => x',
    };
  }

  const [rule, setRule] = useState<ExposeRuleStep>(createExposeRuleStep());

  useEffect(() => {
    const rule = createExposeRuleStep();
    setRule(rule);
    form.setFieldsValue(rule);
  }, []);

  return (
    <div>
      <Form labelCol={{ span: 4 }} form={form}>
        <Form.Item label={'类型'} name={'type'}>
          <ICustomSelect
            style={{ width }}
            requestFn={async () => [
              { label: '内部事件', value: 'event' },
              { label: '全局变量', value: 'globalVar' },
              { label: '打开新页面', value: 'open' },
              { label: '跳转地址', value: 'jump' },
            ]}
            onChange={(type: any) => {
              setRule({
                ...rule,
                type,
              });
            }}
          />
        </Form.Item>
        {rule.type === 'event' && (
          <Form.Item label={'事件'} name={'eventType'}>
            <ICustomSelect
              style={{ width }}
              requestFn={async () => [{ label: 'setValue', value: 'event' }]}
            />
          </Form.Item>
        )}
        {rule.type === 'globalVar' && (
          <Form.Item label={'变量'}>
            <ICustomSelect
              style={{ width }}
              requestFn={async () => [
                { label: 'var1', value: 'event' },
                { label: 'var2', value: 'event' },
              ]}
            />
          </Form.Item>
        )}
        <div style={{ border: '1px solid #e8e8e8', padding: '16px 0 0' }}>
          <Form.Item label={'值'}>
            <Space size={16}>
              <Form.Item noStyle name={'payloadType'}>
                <ICustomSelect
                  style={{ width }}
                  requestFn={async () => [
                    { label: 'default', value: 'default' },
                    { label: '全局变量', value: 'globalVar' },
                    { label: '自定义', value: 'custom' },
                  ]}
                  onChange={(payloadType: any) => {
                    setRule({
                      ...rule,
                      payloadType,
                    });
                    form.setFieldsValue({
                      payload: undefined,
                    });
                  }}
                />
              </Form.Item>
              <a
                style={{ fontSize: 16, ...(showFunc ? {} : { color: '#8f8f8f' }) }}
                onClick={() => setShowFunc(!showFunc)}
              >
                {'{}'}
              </a>
            </Space>
          </Form.Item>
          {rule.payloadType !== 'default' && (
            <Form.Item
              name={'payload'}
              label={rule.payloadType === 'globalVar' ? '全局变量' : '自定义值'}
            >
              {rule.payloadType === 'globalVar' && (
                <ICustomSelect
                  style={{ width }}
                  requestFn={async () => [
                    { label: 'var1', value: 'event' },
                    { label: 'var2', value: 'event' },
                  ]}
                />
              )}
              {rule.payloadType === 'custom' && <Input.TextArea />}
            </Form.Item>
          )}
          {showFunc && (
            <Form.Item label={'解析函数'} name={'parser'}>
              <Input.TextArea style={{ width }} allowClear />
            </Form.Item>
          )}
        </div>
      </Form>
    </div>
  );
}
