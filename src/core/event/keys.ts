export const EVENT = {
  setPage: Symbol(), // 设置页面的json文件

  // ----------- editor --------
  instanceScroll: Symbol(), // 实例滚动
  selectJsonNode: Symbol(), // 选择jsonNode
  editorMount: Symbol(), // 编辑器加载

  // ----------- project --------
  projectChange: Symbol(), // 页面数据变更
  currentLayoutVisible: Symbol(), // 修改当前页面的布局显隐
};
