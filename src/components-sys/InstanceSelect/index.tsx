import ICustomSelect, { ICustomSelectProps } from '../ICustomSelect';
import { engine } from '../../core';

/**
 * 实例选择下拉框
 */
export default function InstanceSelect(props: ICustomSelectProps) {
  return (
    <ICustomSelect
      requestFn={async () =>
        engine.instance.getAllInstance().map((ins) => {
          return {
            label: ins.name,
            value: ins.id,
          };
        })
      }
      placeholder={'请选择'}
      {...props}
    />
  );
}
