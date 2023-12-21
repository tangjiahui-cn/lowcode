/**
 * 项目管理 (后续再转服务器存储)
 *
 * At 2023/12/13
 * By TangJiaHui
 */
import { createPage, engine, EVENT, getUuid, Layout, Page, Project } from '..';
import { cloneDeep } from 'lodash';

const EMPTY_PAGE_NAME = '未命名页面';
const EMPTY_LAYOUT_NAME = '未命名布局';
let projectData: Project | undefined;
let currentPage: Page | Layout | undefined;

const DEV_PROJECT_ID: string = 'dev';

export const project = {
  // 查看已加载的项目
  getProject(): Project | undefined {
    return projectData;
  },
  // 从json文件导入一个项目
  importFromJson(jsonText: any) {
    projectData = jsonText;
  },
  setProject(project: Project | undefined) {
    projectData = project;
  },
  // 从远程取回一个项目
  async fetchProject(projectId: string = '', replacePj: Project) {
    if (__DEV__) {
      projectId = DEV_PROJECT_ID;
      const projectStr = localStorage.getItem(projectId);
      this.setProject(
        projectStr
          ? JSON.parse(projectStr)
          : replacePj
          ? cloneDeep(replacePj)
          : this.createProject('新项目'),
      );
    }

    // 从服务器获取
    // ...

    return projectData;
  },
  // 保存项目
  async saveProject() {
    if (!projectData) {
      throw Error('项目不存在');
    }
    localStorage.setItem(projectData?.projectId, JSON.stringify(projectData));
  },
  // 初始化一个空项目
  createProject(projectName: string) {
    let projectId: string = getUuid();
    if (__DEV__) {
      projectId = DEV_PROJECT_ID;
    }
    return {
      projectId,
      projectName,
      layouts: [],
      pages: [this.createPage('/', '首页')],
    };
  },
  /****************** 当前项操作（页面/布局） ******************/
  // 设置当前使用（Page或Layout）
  setCurrent(page: Page | Layout | undefined) {
    currentPage = page;
  },
  // 获取当前使用（Page或Layout）
  getCurrent(): Page | Layout | undefined {
    return currentPage;
  },
  // 判断是否是Current
  isCurrent(item?: Page | Layout): boolean {
    if (!item || !currentPage) return false;
    return (
      (item as Page).pageId === (currentPage as Page).pageId ||
      (item as Layout).layoutId === (currentPage as Layout).layoutId
    );
  },
  // 清空当前项目内容
  clearCurrentContent() {
    if (currentPage) {
      currentPage.json = createPage();
      if (this.isPage(currentPage)) {
        this.updatePage(currentPage as Page);
      }
      if (this.isLayout(currentPage)) {
        this.updateLayout(currentPage as Layout);
      }
    }
  },
  // 清空当前页面
  /****************** 布局操作 ******************/
  // 获取当前所有布局
  getAllLayout(): Layout[] {
    return projectData?.layouts || [];
  },
  // 获取一个布局
  getLayout(layoutId?: string): Layout | undefined {
    return projectData?.layouts?.find((layout) => layout.layoutId === layoutId);
  },
  // 判断是否是布局
  isLayout(item?: Layout | Page) {
    return !!(item as Layout)?.layoutId;
  },
  // 创建一个布局
  createLayout(layoutName?: string): Layout {
    return {
      layoutName: layoutName || EMPTY_LAYOUT_NAME,
      layoutId: getUuid(),
      json: createPage(),
    };
  },
  // 编辑布局
  async updateLayout(layout: Layout) {
    const target = this.getAllLayout().find((x) => x.layoutId === layout?.layoutId);
    if (target) {
      Object.assign(target, layout);
    }
  },
  // 新增布局
  async addLayout(layout: Layout) {
    projectData?.layouts.push(layout);
  },
  // 删除布局
  async deleteLayout(layoutId: string) {
    if (!projectData) {
      throw new Error('项目不存在');
    }
    if ((this.getCurrent() as Layout)?.layoutId === layoutId) {
      this.setCurrent(undefined);
    }
    projectData.layouts = projectData.layouts.filter((x) => x.layoutId !== layoutId);
    engine.event.notify(EVENT.projectChange, projectData);
  },

  /****************** 页面操作 ******************/
  // 获取当前所有页面
  getAllPage(): Page[] {
    return projectData?.pages || [];
  },
  // 通过路由获取页面
  async getPageByRoute(route: string): Promise<Page | undefined> {
    return projectData?.pages?.find((x) => x.route === route);
  },
  // 通过pageId获取页面
  async getPageByPageId(pageId: string): Promise<Page | undefined> {
    return projectData?.pages?.find((x) => x.pageId === pageId);
  },
  // 通过pageId批量获取页面
  async getPagesByPageIds(pageIds: string[]): Promise<(Page | undefined)[]> {
    return Promise.all(
      pageIds.map((pageId) => {
        return this.getPageByPageId(pageId);
      }),
    );
  },
  // 判断是否是页面
  isPage(item?: Layout | Page) {
    return !!(item as Page)?.pageId;
  },
  // 创建一个新页面
  createPage(route: string, pageName?: string): Page {
    return {
      route,
      pageName: pageName || EMPTY_PAGE_NAME,
      pageId: getUuid(),
      json: createPage(),
    };
  },
  // 编辑页面
  async updatePage(page: Page) {
    const target = this.getAllPage().find((x) => x.pageId === page?.pageId);
    if (target) {
      Object.assign(target, page);
    }
  },
  // 新增页面
  async addPage(page: Page) {
    projectData?.pages.push(page);
  },
  // 删除页面
  async deletePage(pageId: string) {
    if (!projectData) {
      throw new Error('项目不存在');
    }
    if ((this.getCurrent() as Page)?.pageId === pageId) {
      this.setCurrent(undefined);
    }
    projectData.pages = projectData.pages.filter((x) => x.pageId !== pageId);
    engine.event.notify(EVENT.projectChange, projectData);
  },

  /****************** 配置项操作 （缓存在本地） ******************/
  saveExpandedKeys(expandedKeys: unknown[]) {
    if (projectData) {
      localStorage.setItem(DEV_PROJECT_ID + '_expandedKeys', JSON.stringify(expandedKeys));
    }
  },
  getExpandedKeys(): string[] | undefined {
    if (projectData) {
      const res = localStorage.getItem(DEV_PROJECT_ID + '_expandedKeys');
      return res ? JSON.parse(res) : undefined;
    }
    return;
  },
};
