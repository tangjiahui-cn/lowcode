import { engine, getFunctionFromString, instanceEvent, RegisterEventStep } from '..';

/**
 * 执行 event-step
 *
 * @param step 注册事件的step
 * @param payload 默认携带payload
 */
function getPayload(step: RegisterEventStep, payload: any) {
  switch (step.payloadType) {
    case 'default':
      return payload;
    case 'globalVar':
      return engine.variables.getGlobalVar(step.payload)?.value;
    case 'custom':
      return step.payload;
  }
  return payload;
}

export function doneEventStep(step: RegisterEventStep, payload: any) {
  const srcPayload = getPayload(step, payload);

  switch (step.type) {
    case 'event': // 触发其他组件内事件
      const sendPayload = parser(srcPayload, undefined, step.payloadParser);
      instanceEvent.notify(step.event?.id || '', step.event?.eventType || '', sendPayload);
      break;
    case 'globalVar': // 修改全局变量
      const vId = step?.globalVar?.vId;
      const targetVar = engine.variables.getGlobalVar(vId);
      const value = parser(srcPayload, targetVar?.value, step.payloadParser);
      if (targetVar) {
        engine.variables.updateGlobalVar(targetVar, value);
      }
      break;
    case 'openUrl': // 打开新标签页
      window.open(step.url);
      break;
    case 'jumpUrl': // 跳转地址
      window.open(step.url, '_self');
      break;
  }
}

// 解析值
function parser(src: any, des: any, functionString?: string) {
  if (!functionString) return src;
  try {
    const func = getFunctionFromString(functionString);
    return func?.(src, des);
  } catch {
    return src;
  }
}
