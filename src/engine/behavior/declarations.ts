// 携带参数
export type NotifyPayload<T = any, E = any> = {
  data?: T; // 携带数据
  from?: Symbol | string | number; // 标识来源
  event?: E; // 原生事件
};

// jsonNode操作
type JsonNodeOpt =
  | 'jsonNode-set' // jsonNode全部重新设置
  | 'jsonNode-select' // jsonNode选中一个
  | 'jsonNode-update' // jsonNode更新一个节点
  | 'jsonNode-new' // jsonNode新建一个节点
  | 'jsonNode-delete' // jsonNode删除一个节点
  | 'jsonNode-move'; // jsonNode移动一个节点

// 实例操作
type instanceOpt = 'instance-scroll'; // 实例滚动

export type BehaviorId = JsonNodeOpt | instanceOpt;
