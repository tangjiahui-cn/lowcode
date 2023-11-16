/**
 * 布局样式
 */
import { InputNumber, Select, Space } from 'antd';
import { css } from 'class-css';
import { useEffect, useState } from 'react';
import { DEFAULT_SIZE_UNIT, sizeUnitOptions, StyleProcessBorder, JsonNode } from '../../../../core';
import Item from './Item';
import { cloneDeep } from 'lodash';

const unitWidth = 80;
export const valueWidth = 150;
export const labelStyle = css({
  width: 50,
});

interface IProps {
  jsonNode?: JsonNode;
  onChange?: (value?: StyleProcessBorder) => void;
}
export default function BorderStyle(props: IProps) {
  const [value, setValue] = useState<StyleProcessBorder | undefined>();

  function emitChange(value?: StyleProcessBorder) {
    setValue(value);
    props?.onChange?.(value);
  }

  useEffect(() => {
    const value = cloneDeep(props?.jsonNode?.styleData?.border || {});
    setValue(value);
  }, [props?.jsonNode]);

  return (
    <Space style={{ width: '100%' }} direction={'vertical'}>
      <Item
        title={'上边框'}
        value={{
          color: value?.borderTopColor,
          style: value?.borderTopStyle,
          width: value?.borderTopWidth,
          widthUnit: value?.borderTopWidthUnit,
        }}
        onChange={(x) =>
          emitChange({
            ...value,
            borderTopColor: x.color,
            borderTopStyle: x.style,
            borderTopWidth: x.width,
            borderTopWidthUnit: x.widthUnit,
          })
        }
      />
      <Item
        title={'右边框'}
        value={{
          color: value?.borderRightColor,
          style: value?.borderRightStyle,
          width: value?.borderRightWidth,
          widthUnit: value?.borderRightWidthUnit,
        }}
        onChange={(x) =>
          emitChange({
            ...value,
            borderRightColor: x.color,
            borderRightStyle: x.style,
            borderRightWidth: x.width,
            borderRightWidthUnit: x.widthUnit,
          })
        }
      />
      <Item
        title={'下边框'}
        value={{
          color: value?.borderBottomColor,
          style: value?.borderBottomStyle,
          width: value?.borderBottomWidth,
          widthUnit: value?.borderBottomWidthUnit,
        }}
        onChange={(x) =>
          emitChange({
            ...value,
            borderBottomColor: x.color,
            borderBottomStyle: x.style,
            borderBottomWidth: x.width,
            borderBottomWidthUnit: x.widthUnit,
          })
        }
      />
      <Item
        title={'左边框'}
        value={{
          color: value?.borderLeftColor,
          style: value?.borderLeftStyle,
          width: value?.borderLeftWidth,
          widthUnit: value?.borderLeftWidthUnit,
        }}
        onChange={(x) =>
          emitChange({
            ...value,
            borderLeftColor: x.color,
            borderLeftStyle: x.style,
            borderLeftWidth: x.width,
            borderLeftWidthUnit: x.widthUnit,
          })
        }
      />
      <b>圆角</b>
      <Space>
        <div className={labelStyle}>左上角</div>
        <InputNumber
          style={{ width: valueWidth }}
          placeholder={'请输入'}
          value={value?.borderTopLeftRadius}
          onChange={(borderTopLeftRadius) => {
            emitChange({
              ...value,
              borderTopLeftRadius,
            });
          }}
        />
        <Select
          style={{ width: unitWidth }}
          options={sizeUnitOptions}
          placeholder={'请选择'}
          value={value?.borderTopLeftRadiusUnit || DEFAULT_SIZE_UNIT}
          onChange={(borderTopLeftRadiusUnit: any) => {
            emitChange({
              ...value,
              borderTopLeftRadiusUnit,
            });
          }}
        />
      </Space>
      <Space>
        <div className={labelStyle}>右上角</div>
        <InputNumber
          style={{ width: valueWidth }}
          placeholder={'请输入'}
          value={value?.borderTopRightRadius}
          onChange={(borderTopRightRadius) => {
            emitChange({
              ...value,
              borderTopRightRadius,
            });
          }}
        />
        <Select
          style={{ width: unitWidth }}
          options={sizeUnitOptions}
          placeholder={'请选择'}
          value={value?.borderTopRightRadiusUnit || DEFAULT_SIZE_UNIT}
          onChange={(borderTopRightRadiusUnit: any) => {
            emitChange({
              ...value,
              borderTopRightRadiusUnit,
            });
          }}
        />
      </Space>
      <Space>
        <div className={labelStyle}>左下角</div>
        <InputNumber
          style={{ width: valueWidth }}
          placeholder={'请输入'}
          value={value?.borderBottomLeftRadius}
          onChange={(borderBottomLeftRadius) => {
            emitChange({
              ...value,
              borderBottomLeftRadius,
            });
          }}
        />
        <Select
          style={{ width: unitWidth }}
          options={sizeUnitOptions}
          placeholder={'请选择'}
          value={value?.borderBottomLeftRadiusUnit || DEFAULT_SIZE_UNIT}
          onChange={(borderBottomLeftRadiusUnit: any) => {
            emitChange({
              ...value,
              borderBottomLeftRadiusUnit,
            });
          }}
        />
      </Space>
      <Space>
        <div className={labelStyle}>右上角</div>
        <InputNumber
          style={{ width: valueWidth }}
          placeholder={'请输入'}
          value={value?.borderBottomRightRadius}
          onChange={(borderBottomRightRadius) => {
            emitChange({
              ...value,
              borderBottomRightRadius,
            });
          }}
        />
        <Select
          style={{ width: unitWidth }}
          options={sizeUnitOptions}
          placeholder={'请选择'}
          value={value?.borderBottomRightRadiusUnit || DEFAULT_SIZE_UNIT}
          onChange={(borderBottomRightRadiusUnit: any) => {
            emitChange({
              ...value,
              borderBottomRightRadiusUnit,
            });
          }}
        />
      </Space>
    </Space>
  );
}
