import {Events} from "../data";

/**
 * 事件合并
 *
 */
export function mergeEvents (obj1?: Events<any>, obj2?: Events<any>) : any {
  const eventMap: {
    [k: string]: any
  } = {}
  const set: Set<string> = new Set()
  obj1 && Object?.keys(obj1)?.forEach(k => set.add(k));
  obj2 && Object?.keys(obj2)?.forEach(k => set.add(k));
  set.forEach((k: string) => {
    eventMap[k] = (e: any) => {
      if (obj1) {
        ((obj1 as any)?.[k] as any)?.(e);
      }
      if (obj2) {
        ((obj2 as any)?.[k] as any)?.(e);
      }
    }
  })
  return eventMap;
}
