import { useEffect, useState } from 'react';
import { Empty, Space } from 'antd';
import { DeleteOutlined, SettingOutlined } from '@ant-design/icons';
import { headerStyle, itemStyle } from './style';
import AddGlobalVariableDialog from './components/AddGlobalVariableDialog';
import { engine, GlobalVariable } from '../../../core';
import { EVENT } from '../../../enum';
import ITipDialog from '../../../components-sys/ITipDialog';

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

  function emitList(list: GlobalVariable[], isSave = true) {
    setList(list);
    isSave && save(list);
    engine.variables.registerGlobalVarList(list);
  }

  function handleDelete(item: GlobalVariable) {
    ITipDialog.open({
      title: '提醒',
      content: `是否删除"${item?.name}"全局变量?`,
      onOk(close) {
        engine.variables.unRegisterGlobalVar(item);
        emitList(list.filter((x) => x.vId !== item.vId));
        close();
      },
    });
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

  function save(list: GlobalVariable[]) {
    const pageJsonNode = engine.jsonNode.get(engine.instance.getPageInstance()?.id);
    if (pageJsonNode) {
      pageJsonNode.variable = list;
      engine.json.updateJsonNode(pageJsonNode);
    }
  }

  function init() {
    emitList(engine.variables.getGlobalVarList(), false);
  }

  useEffect(() => {
    init();

    function updateList(list: GlobalVariable[] = []) {
      emitList(list, false);
    }

    engine.globalEvent.on(EVENT.GLOBAL_VAR, updateList);
    return () => {
      engine.globalEvent.remove(EVENT.GLOBAL_VAR, updateList);
    };
  }, []);

  return (
    <div>
      <div className={headerStyle}>
        <span style={{ color: '#6e6e6e', fontSize: 14 }}>全局变量管理页面</span>
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
                <a>
                  <DeleteOutlined onClick={() => handleDelete(x)} />
                </a>
                <a>
                  <SettingOutlined onClick={() => handleEdit(x)} />
                </a>
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
          emitList(targetList);
        }}
      />
    </div>
  );
}
