import { Space } from 'antd';
import { ExposeRule, TriggerRule, JsonNode, RegisterComponent } from '../../../core';
import ExposeRulePanel from './ExposeRule';
import TriggerRulePanel from './TriggerRule';

/**
 * 事件面板 (暂时废弃，后续考虑启用)
 */
interface IProps {
  jsonNode?: JsonNode;
  component?: RegisterComponent;
  onExposeEvents?: (list: any[]) => void;
  onTriggerEvents?: (list: any[]) => void;

  onChangeExposeRules?: (rules: ExposeRule[]) => void;
  onChangeTriggerRules?: (rules: TriggerRule[]) => void;
}

export default function (props: IProps) {
  return (
    <Space style={{ width: '100%' }} direction={'vertical'}>
      <ExposeRulePanel jsonNode={props?.jsonNode} onChange={props?.onChangeExposeRules} />
      <TriggerRulePanel jsonNode={props?.jsonNode} onChange={props?.onChangeTriggerRules} />
    </Space>
  );
}
