/**
 * 当前组件树JSON
 *
 * At 2023/10/31
 * By TangJiaHui
 */
import { RegisterComponent } from './currentComponents';
import * as React from 'react';
import { ExposeRule, TriggerRule } from '../core';

// （简单事件系统）
// 输入框 change  => 按钮 setValue
// 按钮 click     => 列表 query

// （复杂事件系统）
// 下拉框 change => 下拉框setValue 、列表query、【global = {}】
// 下拉框 change => 下拉框setValue、global = {}
// 按钮 click => 下拉框setValue, global = {}

export type JsonNode<T = any> = {
  // 实例信息
  id: string; // 实例id
  // 样式
  style?: React.CSSProperties;
  // 私有属性
  attributes?: T;
  // 嵌套子元素
  children?: JsonNode[];
  // 触发规则
  triggerRules?: TriggerRule[];
  // 暴露规则
  exposeRules?: ExposeRule[];
} & Pick<RegisterComponent, 'cId' | 'cType' | 'name' | 'isPage' | 'isContainer'>;

interface CurrentJson {
  // 保存 json
  getJson: () => JsonNode[];
  // 设置 json
  setJson: (newJson: JsonNode[]) => JsonNode[];
  // 更新某个节点
  updateJsonNode: (jsonNode: JsonNode) => void;
}

let json: JsonNode[] = [];
export const currentJson: CurrentJson = {
  getJson() {
    return json;
  },
  setJson(newJson: JsonNode[]) {
    return (json = newJson);
  },
  updateJsonNode(jsonNode: JsonNode) {
    if (!jsonNode) return;
    update(json, jsonNode);

    // 遍历更新节点
    function update(json: JsonNode[] = [], jsonNode: JsonNode) {
      if (!json.length) return;
      for (let i = 0; i < json.length; i++) {
        const current = json[i];
        if (current.id === jsonNode.id) {
          Object.assign(current, jsonNode);
          return;
        } else {
          update(current?.children, jsonNode);
        }
      }
    }
  },
};
