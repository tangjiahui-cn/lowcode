import { Space, Button, message } from 'antd';
import Logo from './Logo';
import { createPage } from '@/core';
import { runtime, startFlow } from '@/engine';

export default function () {
  function handleOpt(opt: 'save' | 'clear' | 'preview') {
    switch (opt) {
      case 'save': // 保存项目
        const page = runtime.jsonNodes.getPage();
        localStorage.setItem('__data__', JSON.stringify(page));
        message.success('保存成功');
        break;
      case 'clear': // 清空当前页
        startFlow('jsonNode-set', {
          data: createPage(),
        });
        break;
      case 'preview': // 预览项目
        // ...
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
        <Button onClick={() => handleOpt('save')}>保存</Button>
        <Button onClick={() => handleOpt('preview')} type={'primary'}>
          开始演示
        </Button>
      </Space>
    </div>
  );
}
