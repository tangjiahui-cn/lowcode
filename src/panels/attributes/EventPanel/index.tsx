import { Space } from 'antd';
import { ExposeEvent, JsonNode, RegisterComponent, TriggerEvent } from '../../../data';
import ExposeList from './ExposeList';
import TriggerList from './TriggerList';

export interface Option {
  label?: string;
  value?: string;
}

/**
 * 事件面板
 */
interface IProps {
  jsonNode?: JsonNode;
  component?: RegisterComponent;
  onExposeEvents?: (list: ExposeEvent[]) => void;
  onTriggerEvents?: (list: TriggerEvent[]) => void;
}

export default function (props: IProps) {
  return (
    <Space style={{ width: '100%' }} direction={'vertical'}>
      <b>触发事件</b>
      <TriggerList
        component={props?.component}
        jsonNode={props?.jsonNode}
        onChange={props?.onTriggerEvents}
      />
      <b>暴露事件</b>
      <ExposeList
        component={props?.component}
        jsonNode={props?.jsonNode}
        onChange={props?.onExposeEvents}
      />
    </Space>
  );
}
