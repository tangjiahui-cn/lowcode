/**
 * 事件系统 (运行时事件管理)
 *
 * 说明：事件系统控制数据的传输。
 * （1）触发事件数据流:
 *    组件A -> （触发）事件规则 -> 发出数据 -> （到达）暴露事件 -> （生效）组件内部
 *
 * 术语：
 * （1）事件规则：描述数据流向的一种规则。
 *  - 暴露事件规则：监听触发事件规则变更，并使生效到组件内部。
 *  - 触发事件规则：监听组件内部触发事件，触发暴露事件规则，继而影响其他组件内部。
 *
 *  实例事件 -> 多个规则 (id -> rId)
 *
 * （2）实例事件（又成实例内部事件，或者组件内部事件）：
 *  - 实例暴露事件：监听暴露的事件，执行组件内部的操作。
 *  - 实例触发事件：组件内触发了某个事件，发布出去。
 *
 *  实例事件 -> 每个实例（id）
 *
 * （3）组件列表：可以看做实例事件的声明，只是方便查看组件暴露和触发哪些事件。
 *  - 暴露事件列表：模板的所有暴露事件列表。
 *  - 触发事件列表：模板的所有触发事件列表。
 *
 *  流程：
 *   实例触发事件 -> 触发事件规则 -> 暴露事件规则 -> 实例暴露事件
 *
 * At 2023/11/10
 * By TangJiaHui
 */
import {
  MapEvent,
  BaseEventCallBack,
  ExposeRule,
  TriggerRule,
  Expose,
  Trigger,
  RegisterEvent,
  getFunctionFromString,
  RegisterEventStep,
  engine,
  GlobalVariableType,
} from '..';

export type CallbackType = BaseEventCallBack;

// 实例事件控制
const instanceEvent = new MapEvent();
// 规则事件控制
const ruleEvent = new MapEvent();
// 注册取消监听函数映射
const unRegisterRulesFunctionMap = new Map<string, () => void>();

// 事件控制
export const event = {
  // 添加暴露规则 （触发 -> 实例内部事件）
  addExposeRule(exposeRule: ExposeRule) {
    // 监听触发事件规则 -> 通知到实例暴露事件
    ruleEvent.on(exposeRule.rId, exposeRule.eventType, notifyToInstanceEvent);

    // 取消规则事件监听
    unRegisterRulesFunctionMap.set(exposeRule.rId, () => {
      ruleEvent.remove(exposeRule.rId, exposeRule.eventType, notifyToInstanceEvent);
    });

    // 通知到实例暴露事件
    function notifyToInstanceEvent(payload: string) {
      instanceEvent.notify(exposeRule.id, exposeRule.eventType, payload);
    }
  },

  // 删除暴露规则
  removeExposeRule(exposeRule: ExposeRule) {
    unRegisterRulesFunctionMap.get(exposeRule?.rId)?.();
    unRegisterRulesFunctionMap.delete(exposeRule.rId);
  },

  // 添加触发规则 (触发 -> 暴露事件规则 -> 实例内部事件)
  addTriggerRule(triggerRule: TriggerRule) {
    // 监听实例事件变更（并发布到暴露规则）
    instanceEvent.on(triggerRule.id, triggerRule.eventType, notifyToExposeRule);

    // 取消实例事件监听
    unRegisterRulesFunctionMap.set(triggerRule.rId, () => {
      instanceEvent.remove(triggerRule.id, triggerRule.eventType, notifyToExposeRule);
    });

    // 发布到暴露规则
    function notifyToExposeRule(payload: any) {
      triggerRule?.to?.forEach((exposeRule) => {
        if (!exposeRule?.rId) {
          throw new Error('exposeRule?.rId is not found.');
        }
        ruleEvent.notify(exposeRule.rId, exposeRule.eventType, payload);
      });
    }
  },

  // 删除触发规则
  removeTriggerRule(triggerRule: TriggerRule) {
    unRegisterRulesFunctionMap.get(triggerRule?.rId)?.();
    unRegisterRulesFunctionMap.delete(triggerRule.rId);
  },

  // 实例内部暴露事件 (监听实例内部事件)
  expose(expose: Expose) {
    instanceEvent.on(expose.id, expose.eventType, expose.callback);
  },

  // 实例内部取消暴露事件
  unExpose(expose: Expose) {
    instanceEvent.remove(expose.id, expose.eventType, expose.callback);
  },

  // 实例内部触发事件 （触发 -> 触发事件规则）
  trigger(trigger: Trigger) {
    // 发布到实例事件变更
    instanceEvent.notify(trigger.id, trigger.eventType, trigger.payload);
  },

  // 注册绑定事件
  registerEvent(events?: RegisterEvent[]) {
    if (!events?.length) return;
    // 监听实例触发事件
    events.forEach((event) => {
      instanceEvent.on(event.id, event.eventType, (payload) => {
        event.steps?.forEach((step) => {
          doneEventStep(step, payload);
        });
      });
    });
  },

  // 取消注册绑定事件
  unRegisterEvent(events?: RegisterEvent[]) {
    if (!events?.length) return;
    events.forEach((event) => {
      instanceEvent.removeKey(event.id);
    });
  },
};

/**
 * 判断数值类型
 *
 */
function judgeValue(value: unknown): GlobalVariableType | undefined {
  if (Number.isFinite(value)) {
    return 'number';
  }

  if (typeof value === 'string') {
    return 'string';
  }

  if (typeof value === 'object' && value) {
    return 'object';
  }

  if (typeof value === 'boolean') {
    return 'boolean';
  }

  return;
}

/**
 * 处理 event-step
 *
 * @param step 注册事件的step
 * @param payload 默认携带payload
 */

function doneEventStep(step: RegisterEventStep, payload: any) {
  let newPayload = parsePayload(step, payload);

  switch (step.type) {
    case 'event': // 触发其他组件内事件
      instanceEvent.notify(step.event?.id || '', step.event?.eventType || '', newPayload);
      break;
    case 'globalVar': // 修改全局变量
      const globalVar = engine.variables.getGlobalVar(step?.globalVar?.vId);
      let type = judgeValue(newPayload);
      let value = newPayload;
      if (!type) {
        type = 'string';
        value = '';
      }
      if (globalVar) {
        globalVar.value = value;
        globalVar.type = type;
        engine.variables.registerGlobalVar(globalVar);
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

/**
 * 解析参数函数
 *
 * @param payload 默认携带payload
 * @param parserFuncString 解析器函数字符串
 */

function parsePayload(step: RegisterEventStep, defaultPayload: any): any {
  let payload = step.payload;

  if (!step?.payloadType || step?.payloadType === 'default') {
    return defaultPayload;
  }

  // 传参是全局变量
  if (step?.payloadType === 'globalVar') {
    const vId = step?.payload;
    payload = engine.variables.getGlobalVar(vId)?.value;
  }

  return parserDefaultPayload(payload, step.payloadParser);
}

// 解析值
function parserDefaultPayload(payload: any, parserFuncString?: string) {
  if (!parserFuncString) return payload;

  try {
    const func = getFunctionFromString(parserFuncString);
    return func?.(payload);
  } catch {
    return payload;
  }
}
