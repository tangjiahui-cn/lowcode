import { EVENT } from '../../enum';
import { engine } from '..';

export enum MODE {
  DEV = '1', // 开发模式
  PREVIEW = '2', // 预览模式
}

/**
 * 全局变量
 */
export interface GlobalVariableConfig {
  mode: MODE; // 模式
  maxZIndex: number; // 最大zIndex
  eventThrottleDelay: number; // 触发事件节流延时

  setMaxZIndex: (zIndex: number) => void; // 设置最大zIndex
  setMode: (mode: MODE) => void; // 设置模式
  isDev: () => boolean; // 是否是开发模式
  isPreview: () => boolean; // 是否是预览模式
}

export const globalVariable: GlobalVariableConfig = {
  mode: MODE.DEV,
  maxZIndex: 0,
  eventThrottleDelay: 4,

  setMaxZIndex: (zIndex?: any) => {
    // 非数字返回
    if (!Number.isFinite(zIndex)) {
      return;
    }
    if (zIndex < globalVariable.maxZIndex) {
      return;
    }
    globalVariable.maxZIndex = zIndex;
    engine.globalEvent.notify(EVENT.SET_MAX_Z_INDEX, zIndex);
  },
  setMode: (mode: MODE) => {
    globalVariable.mode = mode;
  },
  isDev() {
    return globalVariable.mode === MODE.DEV;
  },
  isPreview() {
    return globalVariable.mode === MODE.PREVIEW;
  },
};
