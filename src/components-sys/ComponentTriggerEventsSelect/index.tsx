import ICustomSelect, { ICustomSelectProps } from '../ICustomSelect';
import { engine } from '../../core';

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
        engine.component.getComponent(props?.componentId)?.triggerEvents?.map((ins) => {
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
