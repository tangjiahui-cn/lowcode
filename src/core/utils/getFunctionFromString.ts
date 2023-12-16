/**
 * 从字符串中得到函数
 *
 * At 2023/11/24
 * By TangJiaHui
 *
 * Example:
 * * getFunctionFromString('x => x')
 * * getFunctionFromString('function (x) {return x}')
 */
export function getFunctionFromString(funcText: string) {
  return eval(`(${funcText})`);
}
