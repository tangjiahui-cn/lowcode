/**
 * 查询接口（实验性）
 *
 * At 2023/12/2
 * By TangJiaHui
 */
import axios, { Method } from 'axios';

interface FetchConfig {
  url?: string;
  params?: {
    [K: string]: any;
  };
  method?: Method;
}

export const fetch = {
  start(config: FetchConfig) {
    const isObject = config?.params && typeof config?.params === 'object';

    return axios({
      url: config?.url,
      method: config?.method,
      params: isObject ? config?.params : {},
    }).then((res) => {
      return res.data;
    });
  },
};
