/**
 * 布局样式
 */
import { Checkbox, Input, InputNumber, Select, Space } from 'antd';
import { css } from 'class-css';
import { useEffect, useState } from 'react';
import { StyleProcessText } from '../../../../core';
import { fontWeightOptions, textAlignOptions, verticalAlignOptions } from './enum';

const valueWidth = 150;
const labelStyle = css({
  width: 50,
});

interface IProps {
  value?: StyleProcessText;
  onChange?: (value?: StyleProcessText) => void;
}
export default function LayoutStyle(props: IProps) {
  const [value, setValue] = useState<StyleProcessText | undefined>(props?.value);

  function emitChange(value?: StyleProcessText) {
    setValue(value);
    props?.onChange?.(value);
  }

  useEffect(() => {
    setValue(props?.value);
  }, [props?.value]);

  return (
    <Space style={{ width: '100%' }} direction={'vertical'}>
      <Space>
        <div className={labelStyle}>字体</div>
        <Select
          allowClear
          style={{ width: valueWidth }}
          options={[]}
          placeholder={'请选择'}
          value={value?.fontFamily}
          onChange={(fontFamily) =>
            emitChange({
              ...value,
              fontFamily,
            })
          }
        />
      </Space>
      <Space>
        <div className={labelStyle}>字号</div>
        <InputNumber
          min={0}
          placeholder={'请填写'}
          style={{ width: valueWidth }}
          value={value?.fontSize}
          onChange={(fontSize) =>
            emitChange({
              ...value,
              fontSize,
            })
          }
        />
      </Space>
      <Space>
        <div className={labelStyle}>字重</div>
        <Select
          allowClear
          style={{ width: valueWidth }}
          options={fontWeightOptions}
          placeholder={'请选择'}
          value={value?.fontWeight}
          onChange={(fontWeight) =>
            emitChange({
              ...value,
              fontWeight,
            })
          }
        />
      </Space>
      <Space>
        <div className={labelStyle}>行高</div>
        <Input
          allowClear
          placeholder={'请输入'}
          style={{ width: valueWidth }}
          value={value?.lineHeight}
          onChange={(e) =>
            emitChange({
              ...value,
              lineHeight: e.target.value,
            })
          }
        />
      </Space>
      <Space>
        <div className={labelStyle}>颜色</div>
        <Input
          allowClear
          placeholder={'请输入'}
          style={{ width: valueWidth }}
          value={value?.color}
          onChange={(e) =>
            emitChange({
              ...value,
              color: e.target.value,
            })
          }
        />
      </Space>
      <Space>
        <div className={labelStyle}>水平对齐</div>
        <Select
          allowClear
          placeholder={'请选择'}
          style={{ width: valueWidth }}
          options={textAlignOptions}
          value={value?.textAlign}
          onChange={(textAlign) =>
            emitChange({
              ...value,
              textAlign,
            })
          }
        />
      </Space>
      <Space>
        <div className={labelStyle}>垂直对齐</div>
        <Select
          allowClear
          placeholder={'请选择'}
          style={{ width: valueWidth }}
          options={verticalAlignOptions}
          value={value?.verticalAlign}
          onChange={(verticalAlign) =>
            emitChange({
              ...value,
              verticalAlign,
            })
          }
        />
      </Space>
      <Space>
        <div className={labelStyle}>斜体</div>
        <Checkbox
          checked={value?.fontStyle === 'italic'}
          value={value?.fontStyle}
          onChange={(e) => {
            emitChange({
              ...value,
              fontStyle: e.target.checked ? 'italic' : undefined,
            });
          }}
        />
      </Space>
    </Space>
  );
}
