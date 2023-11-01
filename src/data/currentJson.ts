/**
 * 当前组件树JSON
 *
 * At 2023/10/31
 * By TangJiaHui
 */

export type JsonNode<T = any> = {
  // 实例信息
  id: string; // 实例id
  cType: string;  // 组件类型
  cId: string;  // 组件id
  name?: string; // 实例名称
  isContainer?: boolean;  // 是否是容器类组件（拥有children）

  // 样式
  style?: React.CSSProperties;
  // 私有属性
  attributes?: T;
  // 嵌套子元素
  children?: JsonNode[];
}

interface CurrentJson {
  // 保存 json
  getJson: () => JsonNode[];
  // 设置 json
  setJson: (newJson: JsonNode[]) => JsonNode[];
}

let json: JsonNode[] = [];
export const currentJson: CurrentJson = {
  getJson () {
    return json
  },
  setJson (newJson: JsonNode[]) {
    return json = newJson
  }
};
