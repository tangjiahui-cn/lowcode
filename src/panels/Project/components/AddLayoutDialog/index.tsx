import { engine, Layout } from '@/core';
import { Form, Input, message, Modal } from 'antd';
import { useEffect } from 'react';

interface IProps {
  visible?: boolean;
  isEdit?: boolean;
  data?: Layout;
  onCancel?: () => void;
  onOk?: () => void;
}
export default function AddLayoutDialog(props: IProps) {
  const [form] = Form.useForm();

  function handleOk() {
    form.validateFields().then((values) => {
      if (props?.isEdit) {
        if (!props?.data) {
          return message.error('编辑布局错误');
        }
        // 编辑
        engine.project
          .updateLayout({
            ...props.data,
            layoutName: values?.name,
          })
          .then(props?.onOk);
      } else {
        // 新增
        const newPage = engine.project.createLayout(values.name);
        engine.project.addLayout(newPage).then(props?.onOk);
      }
    });
  }

  useEffect(() => {
    if (props?.visible) {
      form.resetFields();
      if (props?.isEdit) {
        form.setFieldsValue({
          name: props?.data?.layoutName,
        });
      }
    }
  }, [props?.visible]);

  return (
    <Modal
      centered
      open={props?.visible}
      title={props?.isEdit ? '编辑布局' : '新增布局'}
      onCancel={props?.onCancel}
      onOk={handleOk}
    >
      <Form form={form}>
        <Form.Item label={'名称'} name={'name'} rules={[{ required: true, message: '请输入名称' }]}>
          <Input placeholder={'请输入'} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
