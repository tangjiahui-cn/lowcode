import { Button, Table } from 'antd';
import { createNewTriggerTargetRule } from '../../../../../../utils';
import { TriggerRuleTo } from '../../../../../../core';
import InstanceSelect from '../../../../../../components-sys/InstanceSelect';
import { ColumnsType } from 'antd/es/table';
import InstanceExposeRuleSelect from '../../../../../../components-sys/InstanceExposeRuleSelect';

/**
 * 管理目标事件的列表
 */

interface IProps {
  value?: TriggerRuleTo[];
  onChange?: (value: TriggerRuleTo[]) => void;
}

export default function (props: IProps) {
  const columns: ColumnsType<TriggerRuleTo> = [
    {
      title: '目标实例',
      render: (item: TriggerRuleTo) => {
        return (
          <InstanceSelect
            value={item.id}
            onChange={(id) => {
              Object.assign(item, {
                id,
                rId: undefined,
                name: undefined,
                eventType: undefined,
              });
              emitChange([...(props?.value || [])]);
            }}
          />
        );
      },
    },
    {
      title: '目标事件',
      render: (item: TriggerRuleTo) => {
        return (
          <InstanceExposeRuleSelect
            insId={item?.id}
            value={item.rId}
            effectParams={[item.id]}
            onChange={(id = '', _, map) => {
              Object.assign(item, map[id]?.rule);
              emitChange([...(props?.value || [])]);
            }}
          />
        );
      },
    },
    {
      title: '操作',
      width: 80,
      align: 'center',
      render: (rule: TriggerRuleTo) => {
        return <a onClick={() => handleDelete(rule)}>删除</a>;
      },
    },
  ];

  function emitChange(dataSource: TriggerRuleTo[] = []) {
    props?.onChange?.(dataSource);
  }

  function handleAdd() {
    emitChange([...(props?.value || []), createNewTriggerTargetRule()]);
  }

  function handleDelete(rule: TriggerRuleTo) {
    emitChange(
      props?.value?.filter((x: TriggerRuleTo) => {
        return x.targetId !== rule.targetId;
      }),
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Table
        bordered
        columns={columns}
        size={'small'}
        rowKey={'targetId'}
        dataSource={props?.value || []}
        pagination={false}
        scroll={
          props?.value?.length
            ? {
                y: 300,
              }
            : undefined
        }
      />
      <Button block type={'dashed'} onClick={handleAdd}>
        + 新增
      </Button>
    </div>
  );
}
