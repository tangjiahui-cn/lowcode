import { Modal, Space } from 'antd';
import EditRuleItem from './EditRuleItem';
import { css } from 'class-css';

const itemStyle = css({
  cursor: 'pointer',
  padding: '4px 12px',
  display: 'flex',
  justifyContent: 'space-between',
  '&:hover': {
    background: 'whitesmoke',
  },
});

export default function () {
  return (
    <Modal
      visible
      centered
      width={800}
      title={'新增暴露规则'}
      bodyStyle={{
        display: 'flex',
        padding: 0,
        height: 350,
        overflowY: 'auto',
      }}
    >
      <Space direction={'vertical'} style={{ flex: 1, padding: 12 }}>
        {/*<div style={{color: '#ababab', fontSize: 12}}>仅可以触发组件事件或修改全局变量</div>*/}
        {/*<div style={{color: '#ababab', fontSize: 12}}>参数处理：默认参数、全局变量、转换函数</div>*/}
        <div>名称：修改内部值</div>
        <div style={{ display: 'flex' }}>
          步骤：
          <Space direction={'vertical'} size={0} style={{ flex: 1 }}>
            <div className={itemStyle}>
              <span>1. 内部事件 - setValue - 值</span>
              <a>删除</a>
            </div>
            <div className={itemStyle}>2. 全局变量 - setValue - 值</div>
          </Space>
        </div>
      </Space>
      <div style={{ padding: 12, flex: 1, borderLeft: '1px solid #e8e8e8', overflowY: 'auto' }}>
        <EditRuleItem />
      </div>
    </Modal>
  );
}
