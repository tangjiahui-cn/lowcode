export interface IOption {
  label?: string;
  value?: string;
}

export const localSearchFn = (key: string, options?: any) =>
  (options?.children || '').toLowerCase().includes(key.toLowerCase());
