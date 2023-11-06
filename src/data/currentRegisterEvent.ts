/**
 * 当前注册过的事件
 *
 */
type Event = {
  id: string;
  uId: string;
  eId?: string;
  name?: string;
};

interface CurrentRegisterEvent {
  get: (uId?: string) => Event | undefined;
  add: (uId: string, event?: any) => void;
  remove: (uId?: string) => void;
}

const map = new Map<string, Event>();
export const currentRegisterEvent: CurrentRegisterEvent = {
  get(uId?: string) {
    return uId ? map.get(uId) : undefined;
  },
  add(uId: string, event?: any) {
    map.set(uId, event);
  },
  remove(uId?: string) {
    uId && map.delete(uId);
  },
};
