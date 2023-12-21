import { engine, Page } from '@/core';
import { Form, Input, message, Modal } from 'antd';
import { useEffect } from 'react';
import LayoutSelect from '@/common/LayoutSelect';

interface IProps {
  visible?: boolean;
  isEdit?: boolean;
  data?: Page;
  onCancel?: () => void;
  onOk?: () => void;
}
export default function AddPageDialog(props: IProps) {
  const [form] = Form.useForm();

  function handleOk() {
    form.validateFields().then((values) => {
      if (props?.isEdit) {
        if (!props?.data) {
          return message.error('编辑页面错误');
        }
        // 编辑
        engine.project
          .updatePage({
            ...props.data,
            pageName: values?.name,
            route: values?.route,
            bindLayoutId: values?.bindLayoutId,
            bindLayoutVisible: !!values?.bindLayoutId,
          })
          .then(props?.onOk);
      } else {
        // 新增
        const newPage = engine.project.createPage(values.route, values.name);
        newPage.bindLayoutId = values.bindLayoutId;
        engine.project.addPage(newPage).then(props?.onOk);
      }
    });
  }

  useEffect(() => {
    if (props?.visible) {
      form.resetFields();
      if (props?.isEdit) {
        form.setFieldsValue({
          name: props?.data?.pageName,
          route: props?.data?.route,
          bindLayoutId: props?.data?.bindLayoutId,
        });
      }
    }
  }, [props?.visible]);

  return (
    <Modal
      centered
      open={props?.visible}
      title={props?.isEdit ? '编辑页面' : '新增页面'}
      onCancel={props?.onCancel}
      onOk={handleOk}
    >
      <Form form={form} labelCol={{ span: 3 }}>
        <Form.Item label={'名称'} name={'name'} rules={[{ required: true, message: '请输入名称' }]}>
          <Input placeholder={'请输入'} />
        </Form.Item>
        <Form.Item
          label={'路由'}
          name={'route'}
          rules={[{ required: true, message: '请输入路由' }]}
        >
          <Input placeholder={'请输入'} />
        </Form.Item>
        <Form.Item label={'布局'} name={'bindLayoutId'}>
          <LayoutSelect allowClear style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
