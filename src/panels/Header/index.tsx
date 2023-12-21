import { Space, Button, message } from 'antd';
import Logo from './Logo';
import { engine, EVENT, Layout, notify, Page } from '@/core';
import EXAMPLE from '@/example.json';
import { cloneDeep } from 'lodash';

export default function () {
  function saveLocal(text: string, filename = '低代码项目.json') {
    const blob = new Blob([text]);
    const saveLink = document.createElement('a');
    saveLink.href = URL.createObjectURL(blob);
    // 设置 download 属性
    saveLink.download = filename;
    saveLink.click();
  }

  function handleOpt(opt: 'reset' | 'export' | 'save' | 'clear' | 'preview') {
    switch (opt) {
      case 'reset':
        localStorage.clear();
        const data = cloneDeep(EXAMPLE as any);
        engine.project.setProject(data);
        const pages: Page[] = engine.project.getAllPage();
        const layouts: Layout[] = engine.project.getAllLayout();
        const current: any = pages?.[0] || layouts?.[0];
        notify('set-jsonNodes', current?.json);
        engine.project.setCurrent(current);
        engine.event.notify(EVENT.projectChange, data);
        break;
      case 'export': // 保存到本地
        const json = JSON.stringify(engine.project.getProject());
        saveLocal(json);
        break;
      case 'save': // 保存项目
        engine.project.saveProject().then(() => {
          message.success('保存成功');
        });
        break;
      case 'clear': // 清空当前页
        // 清空保存数据
        engine.project.clearCurrentContent();
        // 清空编辑器
        notify('set-jsonNodes', engine.project.getCurrent());
        break;
      case 'preview': // 预览项目
        if (!engine.project.getAllPage()?.length) {
          message.warn('请先添加一个页面');
          return;
        }
        // 预览
        window.open('/#/preview?route=/');
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
        <Button onClick={() => handleOpt('reset')}>重置示例</Button>
        <Button onClick={() => handleOpt('export')}>导出</Button>
        <Button onClick={() => handleOpt('clear')}>清空</Button>
        <Button onClick={() => handleOpt('save')}>保存</Button>
        <Button onClick={() => handleOpt('preview')} type={'primary'}>
          开始演示
        </Button>
      </Space>
    </div>
  );
}
