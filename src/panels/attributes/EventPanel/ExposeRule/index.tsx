import { JsonNode } from '../../../../data';
import { useEffect, useState } from 'react';
import { ExposeRule } from '../../../../core';
import { Space } from 'antd';
import Item from './Item';
import AddExposeRuleDialog from './AddExposeRuleDialog';

interface IProps {
  jsonNode?: JsonNode;
  onChange?: (rules: ExposeRule[]) => void;
}
export default function (props: IProps) {
  const [ruleList, setRuleList] = useState<ExposeRule[]>([]);

  const [visible, setVisible] = useState(false);

  function emitChange(rules: ExposeRule[]) {
    props?.onChange?.(rules);
    setRuleList(rules);
  }

  function handleAdd() {
    setVisible(true);
  }

  useEffect(() => {
    setRuleList(props?.jsonNode?.exposeRules || []);
  }, [props?.jsonNode?.id]);

  return (
    <Space
      style={{ width: '100%', border: '1px solid #e8e8e8', padding: 8 }}
      direction={'vertical'}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <b>暴露规则</b>
        <a style={{ fontSize: 12 }} onClick={handleAdd}>
          新增
        </a>
      </div>

      {ruleList?.length ? (
        <div>
          {ruleList.map((rule) => {
            return (
              <Item
                key={rule?.rId}
                rule={rule}
                jsonNode={props?.jsonNode}
                onDelete={() => {
                  emitChange(ruleList.filter((x) => x.rId !== rule.rId));
                }}
                onChange={(modifyRule: ExposeRule) => {
                  Object.assign(rule, modifyRule);
                  emitChange([...ruleList]);
                }}
              />
            );
          })}
        </div>
      ) : (
        <span style={{ fontSize: 12, color: 'gray' }}>暂无数据</span>
      )}

      <AddExposeRuleDialog
        visible={visible}
        jsonNode={props?.jsonNode}
        onCancel={() => setVisible(false)}
        onOk={(rule) => {
          setVisible(false);
          emitChange([rule, ...ruleList]);
        }}
      />
    </Space>
  );
}
