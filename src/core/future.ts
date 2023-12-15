/**
 * 未来支持特性
 *
 * - 运行时钩子
 */
const hooks: any = {};
// 载入本地数据
hooks.loadLocal((next: () => void) => {
  next();
});
// 保存本地数据
hooks.saveLocal((data: any, next: (nextData: any) => void) => {
  data.menuKey = '11';
  next(data);
});
