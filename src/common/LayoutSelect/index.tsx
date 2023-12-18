import ICustomSelect, { ICustomSelectProps } from '@/common/ICustomSelect';
import { engine } from '@/core';

export default function LayoutSelect(props: ICustomSelectProps) {
  return (
    <ICustomSelect
      {...props}
      requestFn={async () => {
        return engine.project.getAllLayout().map((layout) => {
          return {
            label: layout.layoutName,
            value: layout.layoutId,
          };
        });
      }}
    />
  );
}
