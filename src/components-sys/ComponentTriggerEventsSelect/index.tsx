import { currentComponents } from '../../data';
import ICustomSelect, { ICustomSelectProps } from '../ICustomSelect';

type IProps = ICustomSelectProps & {
  componentId?: string;
};

/**
 * 组件触发事件下拉框
 */
export default function ComponentTriggerEventsSelect(props: IProps) {
  return (
    <ICustomSelect
      requestFn={async () =>
        currentComponents.getComponent(props?.componentId)?.triggerEvents?.map((ins) => {
          return {
            label: ins.eventName,
            value: ins.eventType,
          };
        }) || []
      }
      placeholder={'请选择'}
      {...props}
    />
  );
}
