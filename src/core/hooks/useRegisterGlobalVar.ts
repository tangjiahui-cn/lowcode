import { JsonNode } from '../data';
import { useEffect } from 'react';
import { engine } from '..';
import { EVENT } from '../../enum';

/**
 * 注册全局变量
 *
 * At 2023/12/1
 */
export function useRegisterGlobalVar(jsonNode?: JsonNode) {
  useEffect(() => {
    const isPage = jsonNode?.cId === 'i-page';
    if (isPage) {
      engine.variables.registerGlobalVarList(jsonNode?.variable);
      engine.globalEvent.notify(EVENT.GLOBAL_VAR, jsonNode?.variable);
      return () => {
        engine.variables.unRegisterGlobalVarList(jsonNode?.variable);
      };
    }
  }, [jsonNode]);
}
