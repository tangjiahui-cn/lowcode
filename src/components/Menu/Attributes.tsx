import { AttributesProps, useListenState } from '@/core';
import { AttributesType } from './Template';
import { css } from 'class-css';
import { Input, Space } from 'antd';
import Dynamic from '@/common/Dynamic';
import { DeleteOutlined, SettingOutlined } from '@ant-design/icons';
import AddTabDialog from './components/AddTabDialog';
import { useState } from 'react';

const itemClass = css({
  cursor: 'pointer',
  padding: '4px 12px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  '&:hover': {
    background: 'whitesmoke',
  },
});

export default function Attributes(props: AttributesProps<AttributesType>) {
  const [attributes, setAttributes] = useListenState(props?.attributes);
  const [addTabVisible, setAddTabVisible] = useState(false);
  const [addTabIsEdit, setAddTypeIsEdit] = useState(false);
  const [currentItem, setCurrentItem] = useState<any>(null);

  function handleEdit(item: any) {
    setCurrentItem(item);
    setAddTypeIsEdit(true);
    setAddTabVisible(true);
  }

  function handleAdd() {
    setCurrentItem(false);
    setAddTypeIsEdit(false);
    setAddTabVisible(true);
  }

  function handleDelete(key?: string) {
    emitChange({
      ...attributes,
      options: attributes?.options?.filter?.((x) => {
        return x.key !== key;
      }),
    });
  }

  function emitChange(attributes: AttributesType) {
    setAttributes(attributes);
    props?.onChange?.(attributes);
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, whiteSpace: 'nowrap', alignItems: 'center' }}>
        标题：
        <Input
          placeholder={'请输入'}
          value={attributes?.title}
          onChange={(e) => {
            emitChange({
              ...attributes,
              title: e.target.value,
            });
          }}
        />
      </div>
      <div style={{ border: '1px solid #e8e8e8', marginTop: 16 }}>
        <div
          style={{
            padding: '8px 12px 4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #e8e8e8',
            background: '#efefef',
          }}
        >
          Tab页
        </div>
        {attributes?.options?.map((x) => {
          return (
            <div key={x?.key} className={itemClass}>
              {x?.label}
              <Space>
                <Dynamic type={'scale'}>
                  <a onClick={() => handleDelete(x?.key)}>
                    <DeleteOutlined />
                  </a>
                </Dynamic>
                <Dynamic type={'rotate'}>
                  <a onClick={() => handleEdit(x)}>
                    <SettingOutlined />
                  </a>
                </Dynamic>
              </Space>
            </div>
          );
        })}
        <div style={{ padding: '4px 12px', fontSize: 12 }}>
          <a onClick={handleAdd}>新增一列 +</a>
        </div>
      </div>

      <AddTabDialog
        visible={addTabVisible}
        isEdit={addTabIsEdit}
        data={currentItem}
        onCancel={() => setAddTabVisible(false)}
        onOk={(tab) => {
          if (addTabIsEdit) {
            Object.assign(attributes?.options?.find((x) => x.key === tab?.key) || {}, tab);
          } else {
            attributes?.options?.push(tab);
          }
          emitChange({ ...attributes });
          setAddTabVisible(false);
        }}
      />
    </div>
  );
}
