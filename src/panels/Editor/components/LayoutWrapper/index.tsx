/**
 * 页面布局包裹容器
 *
 * At 2023/12/13
 * By TangJiaHui
 */
import React, { createContext, useEffect, useState } from 'react';
import { engine, JsonNode, Layout, Page } from '@/core';
import RenderJsonNode from '@/panels/Editor/components/RenderJsonNode';

export const layoutChildrenContext = createContext<{
  children?: React.ReactNode;
}>({
  children: undefined,
});

interface LayoutWrapperProps {
  current?: Page | Layout;
  showLayout?: boolean; // 显示布局
  children?: any;
}

export default function LayoutWrapper(props: LayoutWrapperProps) {
  const [jsonNodes, setJsonNodes] = useState<JsonNode[]>([]);

  function renderChildren(children: JsonNode[], isCannotSelect?: boolean): React.ReactElement {
    return (
      <>
        {children.map((jsonNode: JsonNode) => {
          return (
            <RenderJsonNode key={jsonNode.id} jsonNode={jsonNode} isCannotSelect={isCannotSelect} />
          );
        })}
      </>
    );
  }

  useEffect(() => {
    if (props?.showLayout) {
      const current = props?.current;
      if (!current) return;
      const bindLayoutId = engine.project.isPage(current)
        ? (current as Page)?.bindLayoutId
        : undefined;
      const jsonNodes = engine.project.getLayout(bindLayoutId)?.json || [];
      setJsonNodes(jsonNodes);
    }
  }, [props]);

  if (engine.project.isLayout(props?.current)) {
    return props?.children;
  }

  return props?.showLayout ? (
    <layoutChildrenContext.Provider value={{ children: props?.children }}>
      {renderChildren(jsonNodes, true)}
    </layoutChildrenContext.Provider>
  ) : (
    props?.children
  );
}
