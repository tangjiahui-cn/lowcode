/**
 * 渲染树组件标题
 *
 * At 2023/12/14
 * By TangJiaHui
 */
import { ReactNode } from 'react';
import { Space } from 'antd';

export default function RenderLine(props: {
  label?: ReactNode;
  options?: {
    label: ReactNode;
    value: string;
    custom?: boolean; // 不使用a标签
  }[];
  onOperate?: (value: string) => void;
}) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {props?.label}
      {props?.options?.length && (
        <Space>
          {props?.options?.map((x) => {
            return (
              <span
                key={x?.value}
                onClick={(e) => {
                  props?.onOperate?.(x?.value);
                  e.stopPropagation();
                }}
              >
                {x?.custom ? <span>{x?.label}</span> : <a>{x?.label}</a>}
              </span>
            );
          })}
        </Space>
      )}
    </div>
  );
}
