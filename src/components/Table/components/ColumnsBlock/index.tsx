import { Input, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useListenState, getUuid } from '@/core';

type Column = {
  dataIndex: string;
  key: string;
  title: string;
};

interface IProps {
  value?: any[];
  onChange?: (value: any[]) => void;
}

const optWidth = 20;
export default function ColumnsBlock(props: IProps) {
  const [columns, setColumns] = useListenState(props?.value);

  function handleAdd() {
    const list = [
      ...(columns || []),
      {
        key: getUuid(),
        title: '',
        dataIndex: '',
      },
    ];
    setColumns(list);
    props?.onChange?.(list);
  }

  function handleDel(column: any) {
    const list = columns?.filter((x) => x.key !== column.key) || [];
    setColumns(list);
    props?.onChange?.(list);
  }

  return (
    <Space
      style={{
        width: '100%',
        border: '1px solid #e8e8e8',
        padding: 8,
        color: 'gray',
        fontSize: 12,
      }}
      direction={'vertical'}
    >
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <div style={{ flex: 1 }}>标题</div>
        <div style={{ flex: 1 }}>字段</div>
        <div style={{ width: optWidth }}></div>
      </div>
      {columns?.map((column: Column) => {
        return (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }} key={column?.key}>
            <div>
              <Input
                style={{ fontSize: 12 }}
                placeholder={'请输入'}
                defaultValue={column?.title}
                onChange={(e) => {
                  column.title = e.target.value;
                  props?.onChange?.(columns);
                }}
              />
            </div>
            <div>
              <Input
                style={{ fontSize: 12 }}
                placeholder={'请输入'}
                defaultValue={column?.dataIndex}
                onChange={(e) => {
                  column.dataIndex = e.target.value;
                  props?.onChange?.(columns);
                }}
              />
            </div>
            <div style={{ width: optWidth }}>
              <a onClick={() => handleDel(column)}>
                <DeleteOutlined style={{ fontSize: 14 }} />
              </a>
            </div>
          </div>
        );
      })}
      <a style={{ textAlign: 'center' }} onClick={handleAdd}>
        新增一列 +
      </a>
    </Space>
  );
}
