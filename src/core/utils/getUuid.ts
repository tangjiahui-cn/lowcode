/**
 * 获取唯一id
 *
 * At 2023/12/13
 * By TangJiaHui
 */
import { v4 as uuid } from 'uuid';

export function getUuid() {
  return uuid();
}
