import {Button, message, Space} from "antd";
import {page} from "./style";
import {RocketTwoTone} from "@ant-design/icons";
import {currentJson, runtime} from "../../data";
import {createInitJson} from "../../utils/createInitJson";

/**
 * 全局配置面板
 *
 * At 2023/10/31
 * By TangJiaHui
 */
export default function Config () {
  function handleClear () {
    const INIT_JSON = createInitJson();
    runtime?.editor?.setJson?.(currentJson.setJson(INIT_JSON));
    localStorage.setItem('json', JSON.stringify(INIT_JSON))
    message.success('清空成功')
  }

  function handlePreview () {
    handleSave();
    // ...
  }

  function handleSave () {
    localStorage.setItem('json', JSON.stringify(currentJson.getJson()))
    message.success('保存成功')
  }

  return (
    <div className={page}>
      <Space style={{userSelect:'none'}}>
        <RocketTwoTone style={{fontSize: 22}}/>
        <b style={{fontSize: '1.25em'}}>低代码引擎</b>
      </Space>
      <Space>
        <Button onClick={handleClear}>清空</Button>
        <Button onClick={handlePreview}>预览</Button>
        <Button onClick={handleSave} type={'primary'}>保存</Button>
      </Space>
    </div>
  )
}
