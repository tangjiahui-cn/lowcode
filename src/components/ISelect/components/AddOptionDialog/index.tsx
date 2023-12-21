import { Form, Input, Modal } from 'antd';
import { Option } from '../OptionItem';
import { useEffect } from 'react';

interface IProps {
  visible?: boolean;
  isEdit?: boolean;
  option?: Option;
  options?: Option[]; // 用于校验value的唯一性
  onOk?: (option: Option) => void;
  onCancel?: () => void;
}

export default function (props: IProps) {
  const [form] = Form.useForm();

  function handleOk() {
    form.validateFields().then((values) => {
      props?.onOk?.(values);
    });
  }

  useEffect(() => {
    if (props?.visible) {
      form.setFieldsValue({
        label: props?.option?.label,
        value: `${props?.option?.value ?? ''}`,
      });
    }
  }, [props?.visible]);

  return (
    <Modal
      centered
      destroyOnClose
      title={props?.isEdit ? '编辑选项' : '新增选项'}
      open={props?.visible}
      onCancel={() => props?.onCancel?.()}
      onOk={handleOk}
    >
      <Form form={form}>
        <Form.Item
          label={'选项 label'}
          name={'label'}
          rules={[
            {
              required: true,
              message: '请输入label',
            },
          ]}
        >
          <Input placeholder={'请输入'} />
        </Form.Item>
        <Form.Item
          label={'选项 value'}
          name={'value'}
          rules={[
            {
              required: true,
              message: '请输入value',
            },
            {
              validator(_, value) {
                if (props?.options?.find((x) => x?.value === value)) {
                  return Promise.reject('value不能重复');
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input placeholder={'请输入'} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
