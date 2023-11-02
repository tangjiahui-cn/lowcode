import {globalEvent} from "./globalEvent";
import {EVENT} from "../enum";

export enum MODE {
  DEV = '1', // 开发模式
  PREVIEW = '2' // 预览模式
}

/**
 * 全局变量
 */
export interface GlobalVariable {
  mode: MODE; // 模式
  maxZIndex: number; // 最大zIndex
  eventThrottleDelay: number;  // 触发事件节流延时

  setMaxZIndex: (zIndex: number) => void; // 设置最大zIndex
  setMode: (mode: MODE) => void; // 设置模式
  isDev: () => boolean; // 是否是开发模式
  isPreview: () => boolean; // 是否是预览模式
}

export const globalVariable: GlobalVariable = {
  mode: MODE.DEV,
  maxZIndex: 1,
  eventThrottleDelay: 4,

  setMaxZIndex: (zIndex: number) => {
    if (zIndex < globalVariable.maxZIndex) {
      return;
    }
    globalVariable.maxZIndex = zIndex
    globalEvent.notify(EVENT.SET_MAX_Z_INDEX, zIndex)
  },
  setMode: (mode: MODE) => {
    globalVariable.mode = mode
  },
  isDev () {
    return globalVariable.mode === MODE.DEV;
  },
  isPreview () {
    return globalVariable.mode === MODE.PREVIEW;
  }
}
