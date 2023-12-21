/**
 * 开启新的宏任务
 *
 * At 2023/12/12
 * By TangJiaHui
 */

export function nextTick(callback: () => void) {
  setTimeout(callback, 5);
}
