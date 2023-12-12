import React, { useState } from 'react';
import { Space } from 'antd';
import HelpHoverTip from '../HelpHoverTip';

interface ContainerProps {
  tips?: React.ReactNode;
  defaultExpand?: boolean; // 是否展开
  title?: React.ReactNode; // 标题
  children?: React.ReactNode;
}

export default function Container(props: ContainerProps) {
  const [expand, setExpand] = useState(props?.defaultExpand);
  return (
    <div style={{ border: '1px solid #e8e8e8' }}>
      <div
        style={{
          padding: 8,
          borderBottom: expand ? '1px solid #e8e8e8' : 'none',
          background: '#f1f1f1',
          cursor: 'pointer',
          userSelect: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 4,
        }}
        onClick={() => setExpand(!expand)}
      >
        <Space>
          <span>{props?.title}</span>
          {props?.tips && <HelpHoverTip content={props?.tips} />}
        </Space>
      </div>
      <Space
        style={{
          width: '100%',
          fontSize: 12,
          padding: 8,
          display: expand ? 'inline-flex' : 'none',
        }}
        direction={'vertical'}
      >
        {props?.children}
      </Space>
    </div>
  );
}
