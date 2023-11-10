import { currentInstances } from '../../data';
import ICustomSelect, { ICustomSelectProps } from '../ICustomSelect';
import { ExposeRule } from '../../core';

type IProps = ICustomSelectProps & {
  insId?: string; // 实例id
};

/**
 * 实例选择下拉框
 */

export default function InstanceExposeRuleSelect(props: IProps) {
  return (
    <ICustomSelect
      requestFn={async () => {
        return (
          currentInstances
            .getIns(props?.insId)
            ?.getExposeAttributes?.()
            ?.map((exposeRule: ExposeRule) => {
              return {
                label: exposeRule.name,
                value: exposeRule.rId,
                rule: exposeRule,
              };
            }) || []
        );
      }}
      placeholder={'请选择'}
      {...props}
    />
  );
}
