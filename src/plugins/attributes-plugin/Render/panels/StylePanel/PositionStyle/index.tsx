/**
 * 布局样式
 */
import { InputNumber, Select, Space } from 'antd';
import { css } from 'class-css';
import { useEffect, useState } from 'react';
import { deleteSpecificProps, Position, StyleProcessPosition, JsonNode } from '@/engine';
import { positionOptions } from './enum';
import { cloneDeep } from 'lodash';
import { defaultValue, SIZE_UNIT } from '../LayoutStyle';

const valueWidth = 150;
const labelStyle = css({
  width: 50,
});

interface IProps {
  jsonNode?: JsonNode;
  onChange?: (value?: StyleProcessPosition) => void;
}
export default function PositionStyle(props: IProps) {
  const [value, setValue] = useState<StyleProcessPosition | undefined>();
  const [specificVisible, setSpecificVisible] = useState(false);

  function checkIsSpecific(position?: Position) {
    return position ? ['absolute', 'relative', 'fixed', 'sticky'].includes(position) : false;
  }

  function emitChange(value?: StyleProcessPosition) {
    setValue(value);
    props?.onChange?.(value);
  }

  useEffect(() => {
    const value = cloneDeep(props?.jsonNode?.styleData?.position || {});
    setValue(value);
    setSpecificVisible(checkIsSpecific(value?.position));
  }, [props?.jsonNode]);

  return (
    <Space style={{ width: '100%' }} direction={'vertical'}>
      <Space>
        <div className={labelStyle}>定位</div>
        <Select
          allowClear
          style={{ width: valueWidth }}
          options={positionOptions}
          placeholder={'请选择'}
          value={value?.position}
          onChange={(position) => {
            const isSpecific = checkIsSpecific(position);
            let data: StyleProcessPosition = {
              ...value,
              position,
            };

            if (!isSpecific) {
              data = deleteSpecificProps(data);
            }
            emitChange(data);
            setSpecificVisible(isSpecific);
          }}
        />
      </Space>

      {specificVisible && (
        <>
          <Space>
            <div className={labelStyle}>top</div>
            <InputNumber
              placeholder={'auto'}
              value={value?.top}
              onChange={(top) =>
                emitChange({
                  ...value,
                  top,
                })
              }
            />
            <Select
              options={SIZE_UNIT}
              value={value?.topUnit || defaultValue.SIZE_UNIT}
              onChange={(topUnit) =>
                emitChange({
                  ...value,
                  topUnit,
                })
              }
            />
          </Space>
          <Space>
            <div className={labelStyle}>right</div>
            <InputNumber
              placeholder={'auto'}
              value={value?.right}
              onChange={(right) =>
                emitChange({
                  ...value,
                  right,
                })
              }
            />
            <Select
              options={SIZE_UNIT}
              value={value?.rightUnit || defaultValue.SIZE_UNIT}
              onChange={(rightUnit) =>
                emitChange({
                  ...value,
                  rightUnit,
                })
              }
            />
          </Space>
          <Space>
            <div className={labelStyle}>bottom</div>
            <InputNumber
              placeholder={'auto'}
              value={value?.bottom}
              onChange={(bottom) =>
                emitChange({
                  ...value,
                  bottom,
                })
              }
            />
            <Select
              options={SIZE_UNIT}
              value={value?.bottomUnit || defaultValue.SIZE_UNIT}
              onChange={(bottomUnit) =>
                emitChange({
                  ...value,
                  bottomUnit,
                })
              }
            />
          </Space>
          <Space>
            <div className={labelStyle}>left</div>
            <InputNumber
              placeholder={'auto'}
              value={value?.left}
              onChange={(left) =>
                emitChange({
                  ...value,
                  left,
                })
              }
            />
            <Select
              options={SIZE_UNIT}
              value={value?.leftUnit || defaultValue.SIZE_UNIT}
              onChange={(leftUnit) =>
                emitChange({
                  ...value,
                  leftUnit,
                })
              }
            />
          </Space>
        </>
      )}
    </Space>
  );
}
