import { Button, message, Space, Switch } from 'antd';
import { page } from './style';
import { GithubOutlined, RocketTwoTone } from '@ant-design/icons';
import { createInitJson, engine, MODE } from '../../core';
import { useState } from 'react';
import { useUpdateEffect } from 'ahooks';
import { cloneDeep } from 'lodash';
import { EVENT } from '../../enum';

/**
 * 全局配置面板
 *
 * At 2023/10/31
 * By TangJiaHui
 */
export default function Config() {
  const [mode, setMode] = useState<MODE>(MODE.DEV);

  function handleJumpGithub() {
    window.open('https://github.com/tangjiahui-cn/lowcode-engine');
  }

  function handleClear() {
    engine.globalEvent.notify(EVENT.SELECTED_COMPONENT, undefined);
    const INIT_JSON = createInitJson();
    engine.panel?.editor?.setJson?.(engine.json.setJson(INIT_JSON));
    localStorage.setItem('json', JSON.stringify(INIT_JSON));
    message.success('清空成功', 0.3);
  }

  function handleSave() {
    const jsonStr = JSON.stringify(engine.json.getJson());
    localStorage.setItem('json', jsonStr);
    message.success('保存成功', 0.3);
  }

  function handleChangeMode(mode: MODE) {
    engine.global.setMode(mode);

    // 开发模式（重置状态）
    if (mode === MODE.DEV) {
      message.info(
        <Space>
          切换到<span style={{ color: '#f83434' }}>开发</span>模式
        </Space>,
        1,
      );

      engine.panel.editor?.setJson?.([]);
      setTimeout(() => engine.panel.editor.refreshJson());
      return;
    }

    // 预览模式
    if (mode === MODE.PREVIEW) {
      message.info(
        <Space>
          切换到<span style={{ color: '#11e00c' }}>预览</span>模式
        </Space>,
        1,
      );
      const jsonCopy: any[] = cloneDeep(engine.json.getJson());
      engine.panel?.editor?.setJson?.(jsonCopy);
      return;
    }
  }

  useUpdateEffect(() => {
    handleChangeMode(mode);
  }, [mode]);

  return (
    <div className={page}>
      <Space style={{ userSelect: 'none' }}>
        <RocketTwoTone style={{ fontSize: 24 }} />
        <b style={{ fontSize: '1.5em' }}>低代码引擎</b>
        <GithubOutlined
          onClick={handleJumpGithub}
          style={{
            fontSize: '1.25em',
            verticalAlign: 'middle',
            paddingRight: 10,
            cursor: 'pointer',
          }}
        />
      </Space>
      {/*<ModeButtonGroup value={mode} onChange={setMode} />*/}
      <Space>
        <Switch
          checked={mode === MODE.PREVIEW}
          unCheckedChildren={'开发'}
          checkedChildren={'预览'}
          onChange={(checked) => {
            setMode(checked ? MODE.PREVIEW : MODE.DEV);
          }}
        />
        <Button onClick={handleClear}>清空</Button>
        <Button onClick={handleSave} type={'primary'}>
          保存
        </Button>
      </Space>
    </div>
  );
}
