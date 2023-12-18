export type BaseEventCallBack<T = any> = (payload?: T) => void;
export type CallbackType = BaseEventCallBack;

// 暴露事件
export type Expose = {
  id: string; // 实例id
  eventType: string; // 暴露事件类型
  callback: CallbackType; // 回调事件
};

// 触发事件
export type Trigger = {
  id: string; // 实例id
  eventType: string; // 触发事件类型
  payload?: any; // 触发内容
};

export type PayloadType =
  | 'default' // 默认值
  | 'custom' // 自定义值
  | 'globalVar'; // 全局变量

export type PayloadTypeParser = string;

export type RegisterEventStepType =
  | 'event' // 触发目标组件暴露事件
  | 'globalVar' // 修改全局变量
  | 'openUrl' // 打开新页面
  | 'jumpUrl'; // 跳转新页面

// 注册事件步骤
export type RegisterEventStep = {
  stepId: string; // 每条步骤的id
  type: RegisterEventStepType; // 操作类型

  // 目标组件
  event?: {
    id?: string; // 目标实例id
    eventType?: string; // 触发目标实例暴露事件
  };

  // 全局变量
  globalVar?: {
    vId?: string; // 全局变量id
  };
  url?: string; // 打开地址/跳转地址
  payloadType?: PayloadType;
  payload?: any; // 携带参数
  payloadParser?: PayloadTypeParser; // 携带参数解析函数 （字符串形式，运行时转换）
};

// 注册事件
export type RegisterEvent = {
  id: string; // 实例id
  eId: string; // 注册事件唯一id
  eventType: string; // 实例触发事件

  // 执行步骤
  steps?: RegisterEventStep[];
};
