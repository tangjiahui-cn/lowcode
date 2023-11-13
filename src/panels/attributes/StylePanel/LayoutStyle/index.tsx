/**
 * 布局样式
 */
import { InputNumber, Select, Space } from 'antd';
import { css } from 'class-css';
import { useEffect, useState } from 'react';
import { parseCssValue, StyleProcessLayout } from '../../../../core';
import { cloneDeep } from 'lodash';

const labelStyle = css({
  width: 50,
});

const SIZE_UNIT = ['px', '%'].map((value) => ({ label: value, value }));

const defaultValue = {
  SIZE_UNIT: 'px',
};

interface IProps {
  value?: StyleProcessLayout;
  onChange?: (value?: StyleProcessLayout) => void;
}
export default function LayoutStyle(props: IProps) {
  const [value, setValue] = useState<StyleProcessLayout | undefined>(props?.value);

  function emitChange(value?: StyleProcessLayout) {
    setValue(value);
    props?.onChange?.(value);
  }

  useEffect(() => {
    const value = cloneDeep(props?.value);
    if (value?.padding) {
      const obj = parseCssValue(value?.padding);
      value.paddingTop = obj.top;
      value.paddingRight = obj.right;
      value.paddingBottom = obj.bottom;
      value.paddingLeft = obj.left;
      value.paddingTopUnit = obj.topUnit;
      value.paddingRightUnit = obj.rightUnit;
      value.paddingBottomUnit = obj.bottomUnit;
      value.paddingLeftUnit = obj.leftUnit;
      delete value.padding;
    }

    if (value?.margin) {
      const obj = parseCssValue(value?.margin);
      value.marginTop = obj.top;
      value.marginRight = obj.right;
      value.marginBottom = obj.bottom;
      value.marginLeft = obj.left;
      value.marginTopUnit = obj.topUnit;
      value.marginRightUnit = obj.rightUnit;
      value.marginBottomUnit = obj.bottomUnit;
      value.marginLeftUnit = obj.leftUnit;
      delete value.margin;
    }

    setValue(props?.value);
  }, [props?.value]);

  return (
    <Space style={{ width: '100%' }} direction={'vertical'}>
      <Space>
        <div className={labelStyle}>宽度</div>
        <InputNumber
          placeholder={'auto'}
          value={value?.width}
          onChange={(width) =>
            emitChange({
              ...value,
              width,
            })
          }
        />
        <Select
          options={SIZE_UNIT}
          value={value?.widthUnit || defaultValue.SIZE_UNIT}
          onChange={(widthUnit) =>
            emitChange({
              ...value,
              widthUnit,
            })
          }
        />
      </Space>
      <Space>
        <div className={labelStyle}>高度</div>
        <InputNumber
          placeholder={'auto'}
          value={value?.height}
          onChange={(height) =>
            emitChange({
              ...value,
              height,
            })
          }
        />
        <Select
          options={SIZE_UNIT}
          value={value?.heightUnit || defaultValue.SIZE_UNIT}
          onChange={(heightUnit) =>
            emitChange({
              ...value,
              heightUnit,
            })
          }
        />
      </Space>
      <Space>
        <div className={labelStyle}>zIndex</div>
        <InputNumber
          placeholder={'auto'}
          value={value?.zIndex}
          onChange={(zIndex) =>
            emitChange({
              ...value,
              zIndex,
            })
          }
        />
      </Space>
      <div style={{ display: 'flex', gap: 8, flexDirection: 'row' }}>
        <div className={labelStyle}>内边距</div>
        <div
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'flex-start',
            flexWrap: 'wrap',
            gap: 8,
          }}
        >
          <InputNumber
            placeholder={'auto'}
            value={value?.paddingTop}
            onChange={(paddingTop) =>
              emitChange({
                ...value,
                paddingTop,
              })
            }
          />
          <Select
            options={SIZE_UNIT}
            value={value?.paddingTopUnit || defaultValue.SIZE_UNIT}
            onChange={(paddingTopUnit) =>
              emitChange({
                ...value,
                paddingTopUnit,
              })
            }
          />
          <InputNumber
            placeholder={'auto'}
            value={value?.paddingRight}
            onChange={(paddingRight) =>
              emitChange({
                ...value,
                paddingRight,
              })
            }
          />
          <Select
            options={SIZE_UNIT}
            value={value?.paddingRightUnit || defaultValue.SIZE_UNIT}
            onChange={(paddingRightUnit) =>
              emitChange({
                ...value,
                paddingRightUnit,
              })
            }
          />
          <InputNumber
            placeholder={'auto'}
            value={value?.paddingBottom}
            onChange={(paddingBottom) =>
              emitChange({
                ...value,
                paddingBottom,
              })
            }
          />
          <Select
            options={SIZE_UNIT}
            value={value?.paddingBottomUnit || defaultValue.SIZE_UNIT}
            onChange={(paddingBottomUnit) =>
              emitChange({
                ...value,
                paddingBottomUnit,
              })
            }
          />
          <InputNumber
            placeholder={'auto'}
            value={value?.paddingLeft}
            onChange={(paddingLeft) =>
              emitChange({
                ...value,
                paddingLeft,
              })
            }
          />
          <Select
            options={SIZE_UNIT}
            value={value?.paddingLeftUnit || defaultValue.SIZE_UNIT}
            onChange={(paddingLeftUnit) =>
              emitChange({
                ...value,
                paddingLeftUnit,
              })
            }
          />
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8, flexDirection: 'row' }}>
        <div className={labelStyle}>外边距</div>
        <div
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'flex-start',
            flexWrap: 'wrap',
            gap: 8,
          }}
        >
          <InputNumber
            placeholder={'auto'}
            value={value?.marginTop}
            onChange={(marginTop) =>
              emitChange({
                ...value,
                marginTop,
              })
            }
          />
          <Select
            options={SIZE_UNIT}
            value={value?.marginTopUnit || defaultValue.SIZE_UNIT}
            onChange={(marginTopUnit) =>
              emitChange({
                ...value,
                marginTopUnit,
              })
            }
          />
          <InputNumber
            placeholder={'auto'}
            value={value?.marginRight}
            onChange={(marginRight) =>
              emitChange({
                ...value,
                marginRight,
              })
            }
          />
          <Select
            options={SIZE_UNIT}
            value={value?.marginRightUnit || defaultValue.SIZE_UNIT}
            onChange={(marginRightUnit) =>
              emitChange({
                ...value,
                marginRightUnit,
              })
            }
          />
          <InputNumber
            placeholder={'auto'}
            value={value?.marginBottom}
            onChange={(marginBottom) =>
              emitChange({
                ...value,
                marginBottom,
              })
            }
          />
          <Select
            options={SIZE_UNIT}
            value={value?.marginBottomUnit || defaultValue.SIZE_UNIT}
            onChange={(marginBottomUnit) =>
              emitChange({
                ...value,
                marginBottomUnit,
              })
            }
          />
          <InputNumber
            placeholder={'auto'}
            value={value?.marginLeft}
            onChange={(marginLeft) =>
              emitChange({
                ...value,
                marginLeft,
              })
            }
          />
          <Select
            options={SIZE_UNIT}
            value={value?.marginLeftUnit || defaultValue.SIZE_UNIT}
            onChange={(marginLeftUnit) =>
              emitChange({
                ...value,
                marginLeftUnit,
              })
            }
          />
        </div>
      </div>
    </Space>
  );
}
