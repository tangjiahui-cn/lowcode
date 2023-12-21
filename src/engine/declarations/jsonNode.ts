/**
 * JsonNode （存储状态）
 *
 * At 2023/12/10
 * By tangJiaHui
 */
import { RegisterEvent, StyleProcessorData } from '..';

export type JsonNode<Attributes = any> = {
  id: string; // 唯一id
  cName?: string; // 组件名称
  cId: string; // 组件id

  attributes?: Attributes; // 私有属性值
  styleData?: StyleProcessorData; // 未处理样式对象（需要经过style-processor处理得到style）

  // 绑定事件
  events?: RegisterEvent[];

  children?: JsonNode[];
};
