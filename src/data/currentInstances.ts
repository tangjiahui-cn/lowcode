/**
 * 当前组件树实例
 *
 * At 2023/10/31
 * By TangJiaHui
 */

export type Instance = {
  id: string;
  // 经过实例
  handleHover: () => void;
  // 取消经过实例
  handleUnHover: () => void;
  // 选中实例
  handleSelect: () => void;
  // 取消选中实例
  handleUnSelect: () => void;
  // 修改 attributes
  handleSetAttributes: (attributes: any) => void;
}

interface currentInstances {
  // 新增一个实例
  add: (ins: Instance) => void;
  // 获取一个指定实例
  getIns: (id?: string) => (Instance | undefined);
  // 获取所有实例
  getAllIns: () => Instance[];
  // 删除一个指定实例
  delete: (id?: string) => void;
}

const insList: Map<string, Instance> = new Map();
export const currentInstances: currentInstances = {
  add (ins) {
    insList.set(ins.id, ins);
  },
  getIns (id?: string) {
    return id ? insList.get(id) : undefined;
  },
  getAllIns () {
    return [...insList.values()]
  },
  delete (id?: string) {
    if (id) {
      insList.delete(id);
    }
  }
}
