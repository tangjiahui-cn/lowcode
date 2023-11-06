import { useEffect, useState } from 'react';
import { Button, Space } from 'antd';
import { currentInstances, JsonNode, RegisterComponent, TriggerEvent } from '../../../../data';
import { Option } from '../index';
import { v4 as uuid } from 'uuid';
import Item from './Item';

// 创建一个新的触发事件
function createTriggerEvent(id?: string): TriggerEvent {
  return {
    id,
    uId: uuid(),
    eId: undefined,
    eName: undefined,
    targetUId: undefined,
    targetId: undefined,
    targetEventName: undefined,
  };
}

interface IProps {
  component?: RegisterComponent;
  jsonNode?: JsonNode;
  onChange?: (value: TriggerEvent[]) => void;
}

export default function (props: IProps) {
  const [list, setList] = useState<TriggerEvent[]>([]);
  const [triggerOptions, setTriggerOptions] = useState<Option[]>([]);
  const [instanceOptions, setInstanceOptions] = useState<Option[]>([]);

  function handleAdd() {
    handleEmit([...list, createTriggerEvent(props?.jsonNode?.id)]);
  }

  function handleDel(uId: string) {
    handleEmit(list.filter((x) => x.uId !== uId));
  }

  function handleEmit(triggerEvents: TriggerEvent[]) {
    setList(triggerEvents);
    props?.onChange?.(triggerEvents);
  }

  useEffect(() => {
    setList(props?.jsonNode?.triggers || []);
    setInstanceOptions(
      currentInstances.getAllIns().map((x) => {
        return {
          label: x.name,
          value: x.id,
        };
      }),
    );
  }, [props?.jsonNode]);

  useEffect(() => {
    setTriggerOptions(
      props?.component?.triggerEvents?.map((x) => {
        return {
          label: x?.eName,
          value: x?.eId,
        };
      }) || [],
    );
  }, [props?.component]);

  return (
    <Space
      direction={'vertical'}
      style={{ width: '100%', border: '1px solid #e8e8e8', padding: 4 }}
    >
      {list.map((x) => {
        return (
          <Item
            key={x?.uId}
            value={x}
            instanceOptions={instanceOptions}
            triggerOptions={triggerOptions}
            onDelete={handleDel}
            onChange={(newValue) => {
              Object.assign(x, newValue);
              handleEmit(list);
            }}
          />
        );
      })}
      <Button block type={'dashed'} onClick={handleAdd}>
        + 新增一项
      </Button>
    </Space>
  );
}
