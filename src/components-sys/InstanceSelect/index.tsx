import { currentInstances } from '../../data';
import ICustomSelect, { ICustomSelectProps } from '../ICustomSelect';

/**
 * 实例选择下拉框
 */
export default function InstanceSelect(props: ICustomSelectProps) {
  return (
    <ICustomSelect
      requestFn={async () =>
        currentInstances.getAllIns().map((ins) => {
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
