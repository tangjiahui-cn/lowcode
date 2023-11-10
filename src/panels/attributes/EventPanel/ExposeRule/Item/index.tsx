import { SettingOutlined, DeleteOutlined } from '@ant-design/icons';
import { ExposeRule } from '../../../../../core';
import { useState } from 'react';
import AddExposeRuleDialog from '../AddExposeRuleDialog';
import { JsonNode } from '../../../../../data';
import { Space } from 'antd';
import { css } from 'class-css';

const containerStyle = css({
  display: 'flex',
  padding: '4px 0',
  userSelect: 'none',
  '&:hover': {
    background: 'whitesmoke',
  },
});

interface IProps {
  jsonNode?: JsonNode;
  rule?: ExposeRule;
  onChange?: (rule: ExposeRule) => void;
  onDelete?: () => void;
}

export default function (props: IProps) {
  const { rule } = props;
  const [visible, setVisible] = useState(false);
  const [currentData, setCurrentData] = useState<ExposeRule | undefined>(props?.rule);

  function handleEdit() {
    setVisible(true);
    setCurrentData(rule);
  }

  return (
    <div className={containerStyle}>
      <div
        onClick={handleEdit}
        className={css({
          flex: 1,
          cursor: 'pointer',
        })}
      >
        {rule?.name}
      </div>
      <Space>
        <a onClick={props?.onDelete}>
          <DeleteOutlined />
        </a>
        <a onClick={handleEdit}>
          <SettingOutlined />
        </a>
      </Space>

      <AddExposeRuleDialog
        isEdit
        jsonNode={props?.jsonNode}
        visible={visible}
        data={currentData}
        onCancel={() => {
          setVisible(false);
        }}
        onOk={(rule) => {
          setVisible(false);
          props?.onChange?.(rule);
        }}
      />
    </div>
  );
}
