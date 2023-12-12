/**
 * 实例声明
 *
 * At 2023/12/07
 * By TangJiaHui
 */
import { JsonNode } from '..';

export type Instance = {
  id: string; // 实例id
  parentId?: string; // 父jsonNode的id
  jsonNode: JsonNode; // 当前实例对应jsonNode
  handleSelect: () => void; // 选中元素
  handleUnSelect: () => void; // 取消选择元素
  handleHover: () => void; // 经过元素
  handleUnHover: () => void; // 取消经过元素
  scopeUpdateJsonNode: (jsonNode: JsonNode) => void; // 局部更新JsonNode
};
