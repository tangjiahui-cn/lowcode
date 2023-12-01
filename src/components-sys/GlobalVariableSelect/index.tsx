import ICustomSelect, { ICustomSelectProps } from '../ICustomSelect';
import { engine } from '../../core';

type IProps = ICustomSelectProps;

/**
 * 实例暴露规则下拉框
 */

export default function GlobalVariableSelect(props: IProps) {
  return (
    <ICustomSelect
      requestFn={async () => {
        return engine.variables.getGlobalVarList().map((x) => {
          return {
            label: x?.name,
            value: x?.vId,
          };
        });
      }}
      placeholder={'请选择'}
      {...props}
    />
  );
}
