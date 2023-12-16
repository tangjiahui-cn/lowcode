/**
 * 新增/编辑tab页项对话框
 *
 * At 2023/12/16
 * By TangJiaHui
 */
import { Form, Input, Modal } from 'antd';
import { useEffect } from 'react';
import { getUuid } from '@/core';
import { IData } from '../../Template';

interface IProps {
  visible?: boolean;
  isEdit?: boolean;
  data?: IData;
  onCancel?: () => void;
  onOk?: (data: IData) => void;
}
export default function (props: IProps) {
  const [form] = Form.useForm();

  function handleOk() {
    form.validateFields().then((values) => {
      props?.onOk?.({
        key: props?.isEdit ? props?.data?.key : getUuid(),
        label: values?.label,
        route: values?.route,
      });
    });
  }

  useEffect(() => {
    if (props?.visible) {
      form.resetFields();

      if (props?.isEdit) {
        form.setFieldsValue({
          label: props?.data?.label,
          route: props?.data?.route,
        });
      }
    }
  }, [props?.visible]);

  return (
    <Modal
      centered
      title={props?.isEdit ? '编辑tab' : '新增tab'}
      open={props?.visible}
      width={500}
      onCancel={props?.onCancel}
      onOk={handleOk}
    >
      <Form form={form}>
        <Form.Item
          label={'名称'}
          name={'label'}
          rules={[{ required: true, message: '请输入名称' }]}
        >
          <Input placeholder={'请输入'} />
        </Form.Item>
        <Form.Item label={'路由'} name='route' rules={[{ required: true, message: '请输入路由' }]}>
          <Input placeholder={'请输入'} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
