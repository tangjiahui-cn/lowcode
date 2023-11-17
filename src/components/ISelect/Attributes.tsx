import { Attributes } from './Template';
import { Button, Input, Space } from 'antd';
import { useEffect, useState } from 'react';
import { AttributesProps } from '../../core';
import OptionItem, { Option } from './components/OptionItem';
import AddOptionDialog from './components/AddOptionDialog';

const labelWidth = 100;
const width = 200;

/**
 * 属性面板
 */
export default function (props: AttributesProps<Attributes>) {
  const [attributes, setAttributes] = useState<Attributes>(props.attributes);

  const [visible, setVisible] = useState(false);

  function handleChange(attributes: Attributes) {
    setAttributes(attributes);
    props?.onChange?.(attributes);
  }

  useEffect(() => {
    setAttributes(props?.attributes);
  }, [props?.attributes]);

  return (
    <Space style={{ width: '100%' }} direction={'vertical'}>
      <Space>
        <div style={{ width: labelWidth }}>选中值：</div>
        <Input
          style={{ width }}
          placeholder={'请输入'}
          value={attributes?.value}
          onChange={(e) => {
            handleChange({
              ...attributes,
              value: e.target.value,
            });
          }}
        />
      </Space>
      <Space style={{ alignItems: 'flex-start' }}>
        <div style={{ width: labelWidth }}>下拉框选项：</div>
        <Space direction={'vertical'} style={{ width }}>
          {attributes?.options?.map((option, index) => {
            return (
              <OptionItem
                isTop={index === 0}
                isBottom={index === (attributes?.options?.length || 0) - 1}
                key={option?.value}
                option={option}
                options={attributes?.options}
                onMoveTop={() => {
                  const options: Option[] = [];
                  attributes?.options?.forEach((x, ind) => {
                    if (ind === index) return;
                    if (ind === index - 1) {
                      options.push(attributes?.options?.[index] as any);
                    }
                    options.push(x);
                  });
                  handleChange({
                    ...attributes,
                    options,
                  });
                }}
                onMoveDown={() => {
                  const options: Option[] = [];
                  attributes?.options?.forEach((x, ind) => {
                    if (ind === index) return;
                    options.push(x);
                    if (ind === index + 1) {
                      options.push(attributes?.options?.[index] as any);
                    }
                  });
                  handleChange({
                    ...attributes,
                    options,
                  });
                }}
                onChange={(target) => {
                  Object.assign(option, target);
                }}
                onDelete={() => {
                  handleChange({
                    ...attributes,
                    options: attributes?.options?.filter((x) => {
                      return x?.value !== option?.value;
                    }),
                  });
                }}
              />
            );
          })}
          <Button block type={'dashed'} onClick={() => setVisible(true)}>
            + 新增
          </Button>
        </Space>
      </Space>

      <AddOptionDialog
        visible={visible}
        options={attributes.options}
        onCancel={() => setVisible(false)}
        onOk={(option) => {
          handleChange({
            ...attributes,
            options: [...(attributes?.options || []), option],
          });
          setVisible(false);
        }}
      />
    </Space>
  );
}
