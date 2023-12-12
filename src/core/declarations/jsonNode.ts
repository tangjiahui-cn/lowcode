/**
 * JsonNode （存储状态）
 *
 * At 2023/12/10
 * By tangJiaHui
 */

export type JsonNode = {
  id: string; // 唯一id
  cId: string; // 组件id

  children?: JsonNode[];
};
