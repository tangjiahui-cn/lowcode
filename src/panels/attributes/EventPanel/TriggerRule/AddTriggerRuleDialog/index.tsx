import { Form, Modal, Space } from 'antd';
import { TriggerRule, TriggerRuleTo } from '../../../../../core';
import { useEffect, useState } from 'react';
import { JsonNode } from '../../../../../data';
import { createNewTriggerRule } from '../../../../../utils';
import HelpHoverTip from '../../../../../components-sys/HelpHoverTip';
import TargetTable from './TargetTable';
import ComponentTriggerEventsSelect from '../../../../../components-sys/ComponentTriggerEventsSelect';

const TRIGGER_LABEL = (
  <Space>
    触发事件
    <HelpHoverTip content={'触发的实例事件'} />
  </Space>
);

const TARGET_LABEL = (
  <Space>
    目标事件
    <HelpHoverTip content={'触发事件影响到的暴露事件'} />
  </Space>
);

/**
 * 新增暴露规则弹窗
 *
 * At 2023/11/09
 * By TangJiaHui
 */

interface IProps {
  isEdit?: boolean; // 是否编辑
  jsonNode?: JsonNode;
  visible?: boolean;
  data?: TriggerRule; // 编辑时需要的暴露规则
  onCancel?: () => void;
  onOk?: (rule: TriggerRule) => void;
}

export default function AddExposeRuleDialog(props: IProps) {
  const [form] = Form.useForm();
  const [currentRule, setCurrentRule] = useState<TriggerRule>();

  function handleOk() {
    form.validateFields().then((values) => {
      props?.onOk?.({
        ...currentRule,
        ...values,
      });
    });
  }

  useEffect(() => {
    if (props?.visible) {
      const rule = props?.isEdit ? props?.data : createNewTriggerRule(props?.jsonNode?.id);
      setCurrentRule(rule);
      form.setFieldsValue({
        to: rule?.to || [],
        eventType: rule?.eventType,
      });
    }
  }, [props?.visible]);

  return (
    <Modal
      centered
      visible={props?.visible}
      width={800}
      title={props?.isEdit ? '编辑触发规则' : '新增触发规则'}
      onCancel={props?.onCancel}
      onOk={handleOk}
    >
      <Form labelCol={{ span: 4 }} form={form}>
        <Form.Item
          label={TRIGGER_LABEL}
          name={'eventType'}
          rules={[{ required: true, message: '请填写名称' }]}
        >
          <ComponentTriggerEventsSelect
            componentId={props?.jsonNode?.cId}
            onChange={(eventType: string = '', name: string = '') => {
              if (!currentRule) {
                throw new Error('currentRule is not found.');
              }
              setCurrentRule({
                ...currentRule,
                eventType,
                name,
              });
            }}
          />
        </Form.Item>
        <Form.Item
          name={'to'}
          label={TARGET_LABEL}
          rules={[
            {
              validator(_, rules: TriggerRuleTo[]) {
                if (!rules?.length) {
                  return Promise.reject('请配置目标事件');
                }
                if (rules?.find((rule) => !rule?.id || !rule?.rId)) {
                  return Promise.reject('请填写目标实例和目标事件');
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <TargetTable />
        </Form.Item>
      </Form>
    </Modal>
  );
}
