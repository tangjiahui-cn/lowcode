import { Select } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { currentInstances, ExposeEvent, TriggerEvent } from '../../../../data';
import { Option } from '../index';

interface IProps {
  value: TriggerEvent;
  triggerOptions: any[];
  instanceOptions: any[];
  onChange?: (value: TriggerEvent) => void;
  onDelete?: (uId: string) => void;
}

export default function Item(props: IProps) {
  const [value, setValue] = useState<TriggerEvent>();
  const [targetOptions, setTargetOptions] = useState<Option[]>([]);

  function updateTargetOptions(insId: string) {
    const exposeEvents: ExposeEvent[] =
      currentInstances.getIns(insId)?.getExposeAttributes?.() || [];

    setTargetOptions(
      exposeEvents.map((x) => {
        return {
          label: x.eName,
          value: x.uId,
        };
      }),
    );
  }

  function handleChange(value: TriggerEvent) {
    setValue(value);
    props?.onChange?.(value);
  }

  useEffect(() => {
    setValue(props?.value);
    if (props?.value?.targetId) {
      updateTargetOptions(props?.value?.targetId);
    }
  }, [props?.value]);

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        gap: 8,
        alignItems: 'center',
      }}
    >
      <Select
        bordered={false}
        placeholder={'请选择'}
        value={value?.eId}
        options={props?.triggerOptions}
        style={{ flex: 1, overflowX: 'hidden' }}
        onChange={(_, option: any) => {
          if (!value) return;
          value.eId = option.value;
          value.eName = option.label;

          handleChange({
            ...value,
            eId: option.value,
            eName: option.label,
          });
        }}
      />
      <Select
        bordered={false}
        placeholder={'请选择'}
        value={value?.targetId}
        options={props?.instanceOptions}
        style={{ flex: 1, overflowX: 'hidden' }}
        onChange={(_, option: any) => {
          if (!value) return;

          updateTargetOptions(option?.value);
          handleChange({
            ...value,
            targetId: option.value,
            targetEventName: undefined,
            targetUId: undefined,
          });
        }}
      />

      <Select
        bordered={false}
        placeholder={'请选择'}
        value={value?.targetUId}
        options={targetOptions}
        style={{ flex: 1, overflowX: 'hidden' }}
        onChange={(_, option: any) => {
          if (!value) return;

          handleChange({
            ...value,
            targetEventName: option.label,
            targetUId: option.value,
          });
        }}
      />
      <DeleteOutlined
        onClick={() => props?.onDelete?.(props?.value?.uId)}
        style={{ fontSize: 20, color: '#ababab', cursor: 'pointer' }}
      />
    </div>
  );
}
