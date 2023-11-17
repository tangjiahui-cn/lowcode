/**
 * 事件系统
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
import { MapEvent, BaseEventCallBack } from '..';
export type CallbackType = BaseEventCallBack;

// 暴露规则
export type ExposeRule = {
  rId: string; // 规则id
  id: string; // 实例id
  name?: string; // 暴露规则名称
  eventType?: string; // 暴露实例内部规则
};

// 触发规则 - 目标规则
export type TriggerRuleTo = Omit<ExposeRule, 'rId' | 'id'> & {
  targetId: string; // 目标规则记录id
  rId?: string; // 规则id
  id?: string; // 实例id
};

// 触发规则
export type TriggerRule = {
  rId: string; // 规则id
  id: string; // 实例id
  name?: string; // 触发规则名称
  eventType?: string; // 触发事件
  payload?: string; // 携带参数
  to?: TriggerRuleTo[]; // 发布到暴露事件
};

// 暴露事件
export type Expose = {
  id: string; // 实例id
  eventType: string; // 暴露事件类型
  callback: CallbackType; // 回调事件
};

// 触发事件
export type Trigger = {
  id: string; // 实例id
  eventType: string; // 触发事件类型
  payload?: any; // 触发内容
};

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
};
