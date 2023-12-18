/**
 * 预览页面
 *
 * At 2023/12/16
 * By TangJiaHui
 */
import { useEffect, useState } from 'react';
import { engine, getUrlParams, Page } from '@/core';
import LayoutWrapper from '@/panels/Editor/components/LayoutWrapper';
import RenderJsonNode from '@/panels/Editor/components/RenderJsonNode';

export default function () {
  const [page, setPage] = useState<Page>();

  function renderPage(page?: Page) {
    return page?.json?.map((jsonNode) => {
      return <RenderJsonNode jsonNode={jsonNode} key={jsonNode.id} isCannotSelect />;
    });
  }

  useEffect(() => {
    engine.runtime.changePreview();
    const params = getUrlParams(window.location.search);
    const { route = '/' } = params;
    changeRoute(route);

    function changeRoute(route: string) {
      engine.project.getPageByRoute(route).then((page) => {
        setPage(page);
      });
    }

    engine.event.on('route', changeRoute);
    return () => {
      engine.event.remove('route', changeRoute);
    };
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
    >
      <LayoutWrapper current={page} showLayout={page?.bindLayoutVisible}>
        {renderPage(page)}
      </LayoutWrapper>
    </div>
  );
}
