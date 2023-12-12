import { Space, Button } from 'antd';
import Logo from './Logo';
import { engine } from '@/core';

export default function () {
  function handleOpt(opt: 'save' | 'clear') {
    switch (opt) {
      case 'save':
        engine.api.global.save();
        break;
      case 'clear':
        engine.api.global.clear();
        break;
    }
  }

  return (
    <div
      style={{
        padding: '8px 12px',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Logo />
      <Space>
        <Button onClick={() => handleOpt('clear')}>清空</Button>
        <Button onClick={() => handleOpt('clear')}>预览</Button>
        <Button type={'primary'} onClick={() => handleOpt('save')}>
          保存
        </Button>
      </Space>
    </div>
  );
}
