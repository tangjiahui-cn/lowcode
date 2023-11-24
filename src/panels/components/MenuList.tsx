import { AppstoreOutlined, EditOutlined, ApartmentOutlined } from '@ant-design/icons';
import { css } from 'class-css';
import React from 'react';

const btn = css({
  padding: 12,
  fontSize: 20,
  cursor: 'pointer',
  '&:hover': {
    background: 'whitesmoke',
  },
});

export enum MenuType {
  componentList = '1',
  jsonEditor = '2',
  componentTree = '3',
  globalVariable = '4',
}

// 变量图标
function Var(props: { onClick?: () => void; style?: React.CSSProperties; className?: string }) {
  return (
    <div
      style={{ display: 'inline-block', ...props?.style, padding: '6px 12px' }}
      className={props?.className}
      onClick={props?.onClick}
    >
      <span style={{ fontSize: 18 }}>var</span>
    </div>
  );
}

const list = [
  { key: MenuType.componentList, icon: AppstoreOutlined, description: '组件资产' },
  { key: MenuType.jsonEditor, icon: EditOutlined, description: 'JSON编辑器' },
  { key: MenuType.componentTree, icon: ApartmentOutlined, description: '组件树' },
  { key: MenuType.globalVariable, icon: Var, description: '全局变量' },
];

/**
 * 菜单分类列表
 *
 * At 2023/11/03
 * By TangJiaHui
 */
interface IProps {
  value?: MenuType;
  onChange?: (value: MenuType) => void;
}
export default function (props: IProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {list.map((item) => {
        const isChoose = item?.key === props?.value;
        return (
          <item.icon
            onClick={() => props?.onChange?.(item?.key)}
            key={item?.key}
            className={btn}
            style={{
              color: isChoose ? '#5f97e8' : '#888888',
            }}
          />
        );
      })}
    </div>
  );
}
