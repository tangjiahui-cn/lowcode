import { Form, Input, Modal, Select } from 'antd';
import { ExposeRule } from '../../../../../core';
import { useEffect, useState } from 'react';
import { currentComponents, JsonNode } from '../../../../../data';
import { createNewExposeRule } from '../../../../../utils';

/**
 * 新增暴露规则弹窗
 *
 * At 2023/11/09
 * By TangJiaHui
 */
interface OptionItem {
  label: any;
  value: any;
}

interface IProps {
  isEdit?: boolean; // 是否编辑
  jsonNode?: JsonNode;
  visible?: boolean;
  data?: ExposeRule; // 编辑时需要的暴露规则
  onCancel?: () => void;
  onOk?: (rule: ExposeRule) => void;
}

export default function AddExposeRuleDialog(props: IProps) {
  const [form] = Form.useForm();
  const [options, setOptions] = useState<OptionItem[]>([]);
  const [currentRule, setCurrentRule] = useState<ExposeRule | undefined>();

  function handleOk() {
    form.validateFields().then((values) => {
      props?.onOk?.(Object.assign(currentRule || {}, values));
    });
  }

  function initOptions() {
    const component = currentComponents.getComponent(props?.jsonNode?.cId);
    setOptions(
      component?.exposeEvents?.map((x) => {
        return {
          label: x?.eventName,
          value: x?.eventType,
        };
      }) || [],
    );
  }

  useEffect(() => {
    if (props?.visible) {
      const rule = props?.isEdit ? props?.data : createNewExposeRule(props?.jsonNode?.id);
      setCurrentRule(rule);
      form.setFieldsValue(rule);
      initOptions();
    }
  }, [props?.visible]);

  return (
    <Modal
      visible={props?.visible}
      centered
      title={props?.isEdit ? '编辑暴露规则' : '新增暴露规则'}
      onCancel={props?.onCancel}
      onOk={handleOk}
    >
      <Form form={form}>
        <Form.Item
          label={'规则名称'}
          name={'name'}
          rules={[{ required: true, message: '请填写名称' }]}
        >
          <Input style={{ width: 400 }} placeholder={'请输入'} />
        </Form.Item>
        <Form.Item
          label={'绑定事件'}
          name={'eventType'}
          rules={[{ required: true, message: '请选择事件' }]}
        >
          <Select style={{ width: 400 }} options={options} placeholder={'请选择'} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
