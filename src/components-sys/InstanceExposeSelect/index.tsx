import ICustomSelect, { ICustomSelectProps } from '../ICustomSelect';
import { engine } from '../../core';

type IProps = ICustomSelectProps & {
  insId?: string; // 实例id
};

/**
 * 实例暴露规则下拉框
 */

export default function InstanceExposeSelect(props: IProps) {
  return (
    <ICustomSelect
      requestFn={async () => {
        return engine.instanceEvents.getRegisterExposeList(props?.insId).map((expose) => {
          return {
            label: expose.eventType,
            value: expose.eventType,
          };
        });
      }}
      effectParams={[props?.insId]}
      placeholder={'请选择'}
      {...props}
    />
  );
}
