/**
 * 获取地址中的查询参数
 *
 * At 2023/12/16
 * By TangJiaHui
 */

export function getUrlParams(url: string) {
  const params: any = {};
  const questionIndex = url.indexOf('?');
  if (questionIndex < 0) return params;
  const search = url.slice(questionIndex + 1);
  if (!search) return params;
  const list: string[] = search.split('&');
  list.forEach((str) => {
    const [key, value] = str.split('=');
    params[decodeURIComponent(key)] = decodeURIComponent(value);
  });
  return params;
}
