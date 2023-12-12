import { Instance } from '..';

const data = new Map<string, Instance>();
export const instance = {
  // 注册实例
  register(instance: Instance) {
    data.set(instance.id, instance);
  },
  // 删除一个实例
  unRegister(instanceId: string = '') {
    data.delete(instanceId);
  },
  // 获取一个实例
  get(id: string = ''): Instance | undefined {
    return data.get(id);
  },
  // 获取全部实例
  getAll(): Instance[] {
    return [...data.values()];
  },
};
