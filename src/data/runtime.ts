/**
 * 运行时变量
 *
 * At 2023/11/01
 * By TangJiaHui
 */
import {currentJson, JsonNode} from "./currentJson";

interface Runtime {
  // 编辑区域
  editor: {
    // 更新json
    setJson?: (json: JsonNode[]) => void;
    // 刷新json
    refreshJson: (newJson?: JsonNode[]) => void;
    // 面板节点
    domRef?: React.RefObject<HTMLDivElement>;
  }
}

export const runtime: Runtime = {
  editor: {
    setJson: undefined,
    domRef: undefined,
    refreshJson (newJson?: JsonNode[]) {
      if (newJson) currentJson.setJson(newJson)
      runtime.editor.setJson?.([...currentJson.getJson()]);
    }
  }
}
