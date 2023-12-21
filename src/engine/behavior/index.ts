/**
 * 插件与内核交互逻辑：
 * (1) 基础操作：操作内核中的jsonNode、instance、component
 * (2) 行为操作：使用流去触发、拦截指定 behaviorId
 * (3) 跨插件操作：禁止。
 *
 * - startFlow: 开启一个流
 * - hookFlow: 拦截流（可以返回false来中断这个流）
 * - endFlow: 关闭一个流（后续所有拦截与监听均无法获取传输值）
 * - listenFlow: 监听流的数据变化
 * - unListenFlow: 取消监听流的数据变化
 * */
export * from './declarations';
export * from './flow';
