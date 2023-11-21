/**
 * 注册的全局变量（供事件系统使用）
 */

export type Object = {
  [k: string]: any;
};

export const GlobalVariableTypeOptions = [
  'string',
  'number',
  'object',
  'boolean',
  'null',
  'undefined',
].map((x) => ({ label: x, value: x }));
export type GlobalVariableType = 'string' | 'number' | 'object' | 'boolean' | 'null' | 'undefined';
export type GlobalVariableValue = string | number | Object | boolean | number | null | undefined;
export type GlobalVariable = {
  vId: string; // 唯一id
  name: string; // 变量名称
  description?: string; // 描述
  type: GlobalVariableType; // 变量类型
  value: GlobalVariableValue;
};

export const currentVariables = {};
