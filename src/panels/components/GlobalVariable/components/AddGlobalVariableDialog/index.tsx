import { Form, Input, Modal } from 'antd';
import { GlobalVariable, GlobalVariableType, GlobalVariableTypeOptions } from '../../../../../core';
import ICustomSelect from '../../../../../components-sys/ICustomSelect';
import ValueItem from './ValueItem';
import { useEffect, useState } from 'react';
import { getVarUuid } from '../../../../../core';

interface IProps {
  visible?: boolean;
  data?: GlobalVariable;
  isEdit?: boolean;
  onCancel?: () => void;
  onOk?: (variable: GlobalVariable) => void;
}

/**
 * 新增/编辑全局变量弹窗
 *
 * At 2023/11/21
 * By TangJiaHui
 */
export default function AddGlobalVariableDialog(props: IProps) {
  const [type, setType] = useState<GlobalVariableType>();
  const [form] = Form.useForm();

  function handleOk() {
    form.validateFields().then((values) => {
      const variable = {
        ...values,
        vId: props?.isEdit ? props?.data?.vId : getVarUuid(),
      };
      props?.onOk?.(variable);
    });
  }

  function getInitValue(type: GlobalVariableType) {
    if (type === 'undefined') return undefined;
    if (type === 'null') return null;
    if (type === 'string') return '';
    if (type === 'boolean') return false;
    if (type === 'object') return {};
    return undefined;
  }

  useEffect(() => {
    if (props?.visible) {
      if (props?.isEdit) {
        setType(props?.data?.type);
        form.setFieldsValue({
          name: props?.data?.name,
          type: props?.data?.type,
          value: props?.data?.value,
          description: props?.data?.description,
        });
      } else {
        setType('undefined');
        form.setFieldsValue({
          name: undefined,
          type: 'undefined',
          value: undefined,
          description: undefined,
        });
      }
    }
  }, [props?.visible]);

  return (
    <Modal
      centered
      destroyOnClose
      open={props?.visible}
      title={props?.isEdit ? '编辑变量' : '新增变量'}
      onCancel={props?.onCancel}
      onOk={handleOk}
    >
      <Form labelCol={{ span: 4 }} form={form}>
        <Form.Item label={'名称'} name='name' rules={[{ required: true, message: '请输入名称' }]}>
          <Input placeholder={'请输入'} />
        </Form.Item>
        <Form.Item label={'类型'} name={'type'} rules={[{ required: true, message: '请选择类型' }]}>
          <ICustomSelect
            requestFn={async () => GlobalVariableTypeOptions}
            onChange={(type: any) => {
              setType(type);
              form.setFieldsValue({ value: getInitValue(type) });
            }}
          />
        </Form.Item>
        <Form.Item
          label={'值'}
          name={'value'}
          rules={[
            {
              validator(_, value) {
                const type = form.getFieldValue('type');
                if (['undefined', 'null', 'boolean']?.includes(type)) {
                  return Promise.resolve();
                }
                if ([null, undefined, ''].includes(value)) {
                  return Promise.reject('请选择值');
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <ValueItem type={type} />
        </Form.Item>
        <Form.Item label={'描述'} name={'description'}>
          <Input.TextArea
            placeholder={'请输入'}
            autoSize={{
              maxRows: 3,
              minRows: 3,
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
