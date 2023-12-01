/**
 * 注册的全局变量（供事件系统使用）
 *
 * tips: 全局变量挂载在 i-page 节点上
 */

export type Object = {
  [k: string]: any;
};

export const GlobalVariableTypeOptions = ['string', 'number', 'object', 'boolean'].map((x) => ({
  label: x,
  value: x,
}));
export type GlobalVariableType = 'string' | 'number' | 'object' | 'boolean';
export type GlobalVariableValue = string | number | Object | boolean | number | null | undefined;
export type GlobalVariable = {
  vId: string; // 唯一id
  name: string; // 变量名称
  description?: string; // 描述
  type?: GlobalVariableType; // 变量类型
  value?: GlobalVariableValue;
};

const data: {
  [K: string]: GlobalVariable;
} = {};

export const currentVariables = {
  // 注册一个全局变量
  registerGlobalVar(variable: GlobalVariable) {
    data[variable.vId] = variable;
  },
  // 注册多个全局变量
  registerGlobalVarList(variables?: GlobalVariable[]) {
    variables?.forEach((variable) => {
      data[variable.vId] = variable;
    });
  },
  // 取消注册多个全局变量
  unRegisterGlobalVarList(variables?: GlobalVariable[]) {
    variables?.forEach((variable) => {
      delete data[variable.vId];
    });
  },
  // 取消注册一个全局变量
  unRegisterGlobalVar(variable?: GlobalVariable) {
    variable && delete data[variable.vId];
  },
  // 获取全局变量列表
  getGlobalVarList(): GlobalVariable[] {
    return Object.values(data);
  },
  // 获取一个全局变量
  getGlobalVar(vId?: string): GlobalVariable | undefined {
    return vId ? data[vId] : undefined;
  },
};
