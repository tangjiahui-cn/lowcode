import { Space, Button, message } from 'antd';
import Logo from './Logo';
import { engine, notify } from '@/core';

export default function () {
  function handleOpt(opt: 'save' | 'clear' | 'preview') {
    switch (opt) {
      case 'save': // 保存项目
        engine.project.saveProject().then(() => {
          message.success('保存成功');
        });
        break;
      case 'clear': // 清空当前页
        // 清空保存数据
        engine.project.clearCurrentContent();
        // 清空编辑器
        const current = engine.project.getCurrent();
        notify('set-jsonNodes', current?.json);
        break;
      case 'preview': // 预览项目
        if (!engine.project.getAllPage()?.length) {
          message.warn('请先添加一个页面');
          return;
        }
        // 预览
        window.open('/preview?route=/');
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
