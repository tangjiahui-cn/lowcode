/**
 * 菜单项
 *
 * At 2023/12/10
 * By TangJiaHui
 */
import * as React from 'react';
import { css } from 'class-css';

const itemClass = css({
  padding: 12,
  fontSize: 20,
  cursor: 'pointer',
  '&:hover': {
    background: 'whitesmoke',
  },
});

interface IProps {
  value?: string;
  onChange?: (value: string) => void;
  options: {
    label: string;
    key: string;
    value: React.ReactNode | React.FunctionComponent;
    icon: React.FunctionComponent<any>;
  }[];
}

export default function MenuTabs(props: IProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {props?.options?.map((item) => {
        const isChoose = item?.key === props?.value;
        return (
          <item.icon
            onClick={() => props?.onChange?.(item?.key)}
            key={item?.key}
            className={itemClass}
            style={{
              color: isChoose ? '#5f97e8' : '#888888',
            }}
          />
        );
      })}
    </div>
  );
}
