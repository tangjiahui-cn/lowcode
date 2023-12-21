import { Input, InputNumber, Select, Space } from 'antd';
import {
  BorderType,
  BorderUnit,
  borderUnitOptions,
  borderTypeOptions,
  PartialNumber,
  UNIT_DEFAULT,
  DEFAULT_BORDER,
} from '@/engine';
import { labelStyle, valueWidth } from '..';

type Value = {
  color?: string; // 边框颜色
  width?: PartialNumber; // 边框宽度
  widthUnit?: BorderUnit; // 边框宽度单位
  style?: BorderType; // 边框线条样式
};

interface BorderItemProps {
  title?: string;
  value?: Value;
  onChange?: (value: Value) => void;
}

export default function BorderItem(props: BorderItemProps) {
  const { value } = props;

  function emitChange(value: Value) {
    props?.onChange?.(value);
  }

  return (
    <Space style={{ width: '100%' }} direction={'vertical'}>
      <b>{props?.title}</b>
      <Space>
        <div className={labelStyle}>颜色</div>
        <Input
          allowClear
          style={{ width: valueWidth }}
          placeholder={'请输入'}
          value={value?.color}
          onChange={(e) => {
            emitChange({
              ...value,
              color: e.target.value,
            });
          }}
        />
      </Space>
      <Space>
        <div className={labelStyle}>类型</div>
        <Select
          style={{ width: valueWidth }}
          options={borderTypeOptions}
          placeholder={'请选择'}
          value={value?.style || DEFAULT_BORDER}
          onChange={(style) => {
            emitChange({
              ...value,
              style,
            });
          }}
        />
      </Space>
      <Space>
        <div className={labelStyle}>粗细</div>
        <InputNumber
          style={{ width: valueWidth }}
          placeholder={'请选择'}
          value={value?.width}
          onChange={(width) => {
            emitChange({
              ...value,
              width,
            });
          }}
        />
        <Select
          style={{ width: 80 }}
          options={borderUnitOptions}
          placeholder={'请选择'}
          value={value?.widthUnit || UNIT_DEFAULT}
          onChange={(widthUnit: any) => {
            emitChange({
              ...value,
              widthUnit,
            });
          }}
        />
      </Space>
    </Space>
  );
}
