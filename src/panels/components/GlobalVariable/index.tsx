import { useEffect, useState } from 'react';
import { Empty, Space } from 'antd';
import { DeleteOutlined, SettingOutlined } from '@ant-design/icons';
import { headerStyle, itemStyle } from './style';
import AddGlobalVariableDialog from './components/AddGlobalVariableDialog';
import { GlobalVariable } from '../../../core';

/**
 * 全局变量管理页面
 *
 * At 2023/11/21
 * By TangJiaHui
 */

export default function () {
  const [list, setList] = useState<GlobalVariable[]>([]);
  const [currentItem, setCurrentItem] = useState<any>();
  const [visible, setVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  function handleDelete(item: GlobalVariable) {
    setList(list.filter((x) => x.vId !== item.vId));
  }

  function handleEdit(item: GlobalVariable) {
    setCurrentItem(item);
    setIsEdit(true);
    setVisible(true);
  }

  function handleAdd() {
    setIsEdit(false);
    setVisible(true);
  }

  function load() {
    const list = JSON.parse(localStorage['globalVar'] || '[]');
    setList(list);
  }

  function save(list: GlobalVariable[]) {
    localStorage['globalVar'] = JSON.stringify(list);
  }

  useEffect(() => {
    load();
    return () => save(list);
  }, []);

  return (
    <div>
      <div className={headerStyle}>
        <span>全局变量管理页面</span>
        <a onClick={handleAdd}>新增</a>
      </div>
      <Space style={{ width: '100%' }} direction={'vertical'} size={0}>
        {list.map((x) => {
          return (
            <div key={x?.vId} className={itemStyle}>
              <div style={{ padding: '8px 16px', flex: 1 }} onClick={() => handleEdit(x)}>
                {x?.name}
              </div>
              <Space style={{ padding: '0 8px' }}>
                <DeleteOutlined onClick={() => handleDelete(x)} />
                <SettingOutlined onClick={() => handleEdit(x)} />
              </Space>
            </div>
          );
        })}
      </Space>
      {!list?.length && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}

      <AddGlobalVariableDialog
        visible={visible}
        isEdit={isEdit}
        data={currentItem}
        onCancel={() => setVisible(false)}
        onOk={(variable) => {
          let targetList = list;
          setVisible(false);
          if (isEdit) {
            const target = list.find((x) => x.vId === variable.vId);
            if (target) {
              Object.assign(target, variable);
            }
          } else {
            targetList = [...list, variable];
          }
          setList(targetList);
          setTimeout(() => save(targetList));
        }}
      />
    </div>
  );
}
