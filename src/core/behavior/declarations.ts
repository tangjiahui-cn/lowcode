export type BehaviorId =
  | 'set-jsonNodes' // 设置编辑器jsonNodes
  | 'scoped-update-jsonNode' // 局部更新json节点
  | 'change-layout-visible' // layout显隐
  | 'select-json-node' // 选中jsonNode
  | 'editor-mount' // 编辑器挂载
  | 'instance-scroll'; // 实例滚动
