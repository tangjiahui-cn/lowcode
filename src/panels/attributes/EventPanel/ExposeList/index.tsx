import { useEffect, useState } from 'react';
import { Button, Select, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { ExposeEvent, JsonNode, RegisterComponent } from '../../../../data';
import { Option } from '../index';
import { v4 as uuid } from 'uuid';

// 创建一个新的暴露事件
function createExposeEvent(id?: string): ExposeEvent {
  return {
    id,
    uId: uuid(),
    eId: undefined,
    eName: undefined,
  };
}

interface IProps {
  component?: RegisterComponent;
  jsonNode?: JsonNode;
  onChange?: (value: ExposeEvent[]) => void;
}
export default function (props: IProps) {
  const [list, setList] = useState<ExposeEvent[]>([]);
  const [exposeOptions, setExposeOptions] = useState<Option[]>([]);

  function handleAdd() {
    handleEmit([...list, createExposeEvent(props?.jsonNode?.id)]);
  }

  function handleDel(uId: string) {
    handleEmit(list.filter((x) => x.uId !== uId));
  }

  function handleEmit(exposes: ExposeEvent[]) {
    setList(exposes);
    props?.onChange?.(exposes);
  }

  useEffect(() => {
    setList(props?.jsonNode?.exposes || []);
  }, [props?.jsonNode]);

  useEffect(() => {
    setExposeOptions(
      props?.component?.exposeEvents?.map((x) => {
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
          <div
            key={x?.uId}
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
              options={exposeOptions}
              defaultValue={x?.eId}
              style={{ flex: 1 }}
              onChange={(_, option: any) => {
                x.eId = option.value;
                x.eName = option.label;
                handleEmit(list);
              }}
            />
            <DeleteOutlined
              onClick={() => handleDel(x?.uId)}
              style={{ fontSize: 20, color: '#ababab', cursor: 'pointer' }}
            />
          </div>
        );
      })}
      <Button block type={'dashed'} onClick={handleAdd}>
        + 新增一项
      </Button>
    </Space>
  );
}
