import {Button, message, Space} from "antd";
import {page} from "./style";
import {GithubOutlined, RocketTwoTone} from "@ant-design/icons";
import {currentJson, currentPanels, globalVariable, MODE} from "../../data";
import {createInitJson} from "../../utils/createInitJson";
import ModeButtonGroup from "../../components-sys/ModeButtonGroup";
import {useState} from "react";
import {useUpdateEffect} from "ahooks";
import {cloneDeep} from "lodash";

/**
 * 全局配置面板
 *
 * At 2023/10/31
 * By TangJiaHui
 */
export default function Config () {
  const [mode, setMode] = useState<MODE>(MODE.DEV)

  function handleJumpGithub () {
    window.open('https://github.com/tangjiahui-cn/lowcode-engine')
  }

  function handleClear () {
    const INIT_JSON = createInitJson();
    currentPanels?.editor?.setJson?.(currentJson.setJson(INIT_JSON));
    localStorage.setItem('json', JSON.stringify(INIT_JSON))
    message.success('清空成功')
  }

  function handleSave () {
    const jsonStr = JSON.stringify(currentJson.getJson())
    localStorage.setItem('json', jsonStr)
    message.success('保存成功')
  }

  function handleChangeMode (mode: MODE) {
    globalVariable.setMode(mode);

    // 开发模式（重置状态）
    if (mode === MODE.DEV) {
      currentPanels.editor.setJson?.([]);
      setTimeout(() => {
        currentPanels.editor.refreshJson()
      })
      return
    }

    // 预览模式
    if (mode === MODE.PREVIEW) {
      const jsonCopy: any[] = cloneDeep(currentJson.getJson())
      currentPanels?.editor?.setJson?.(jsonCopy);
      return
    }
  }

  useUpdateEffect(() => {
    handleChangeMode(mode)
  }, [mode])

  return (
    <div className={page}>
      <Space style={{userSelect:'none'}}>
        <RocketTwoTone style={{fontSize: 24}}/>
        <b style={{fontSize: '1.5em'}}>低代码引擎</b>
      </Space>
      <ModeButtonGroup
        value={mode}
        onChange={setMode}
      />
      <Space>
        <GithubOutlined
          onClick={handleJumpGithub}
          style={{
            fontSize: '1.25em',
            verticalAlign: 'middle',
            paddingRight: 10,
            cursor: 'pointer'
          }}
        />
        <Button onClick={handleClear}>清空</Button>
        <Button onClick={handleSave} type={'primary'}>保存</Button>
      </Space>
    </div>
  )
}
