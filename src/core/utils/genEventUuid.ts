import { v4 as uuid } from 'uuid';
import { ExposeRule, TriggerRule, TriggerRuleTo } from '..';

/**
 * 生成事件uuid
 */
export function genEventUuid() {
  return uuid();
}

/**
 * 创建新的暴露规则
 * @param insId 组件实例id
 */
export function createNewExposeRule(insId?: string): ExposeRule {
  if (!insId) {
    throw new Error('id is not found.');
  }
  return {
    rId: genEventUuid(),
    id: insId,
    eventType: undefined,
    name: undefined,
  };
}

/**
 * 创建新的触发规则
 * @param insId 组件实例id
 */
export function createNewTriggerRule(insId?: string): TriggerRule {
  if (!insId) {
    throw new Error('id is not found.');
  }
  return {
    rId: genEventUuid(),
    id: insId,
    name: undefined,
    eventType: undefined,
    payload: undefined,
    to: undefined,
  };
}

/**
 * 创建新的触发规则 - 目标规则
 */
export function createNewTriggerTargetRule(): TriggerRuleTo {
  return {
    targetId: genEventUuid(),
    rId: undefined,
    id: undefined,
    name: undefined,
    eventType: undefined,
  };
}
