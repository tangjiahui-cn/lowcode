/**
 * 项目管理
 *
 * At 2023/12/13
 * By TangJiaHui
 */
import { createPage, getUuid, JsonFile, Layout, Page, Project } from '..';

const EMPTY_PAGE_NAME = '未命名页面';
const jsonFileTemp = new Map<string, JsonFile>(); // 创建本地JsonFile缓存
let projectData: Project | undefined;

export const project = {
  // 初始化一个空项目
  createProject(projectName: string) {
    projectData = {
      projectId: getUuid(),
      projectName,
      layouts: [],
      pages: [this.createPage('/', '首页')],
    };
  },

  /****************** 布局操作 ******************/
  // 获取当前所有布局
  getAllLayouts(): Layout[] {
    return projectData?.layouts || [];
  },

  /****************** 页面操作 ******************/
  // 获取当前所有页面
  getAllPages(): Page[] {
    return projectData?.pages || [];
  },
  // 创建一个新页面
  createPage(route: string, pageName?: string): Page {
    const jsonFile = this.createJsonFile();
    return {
      route,
      pageName: pageName || EMPTY_PAGE_NAME,
      pageId: getUuid(),
      jsonId: jsonFile.jsonId,
    };
  },

  /****************** JsonFile操作 ******************/
  // 创建一个新JsonFile
  createJsonFile(): JsonFile {
    const jsonFile: JsonFile = {
      jsonId: getUuid(),
      jsonData: createPage(),
    };
    jsonFileTemp.set(jsonFile.jsonId, jsonFile);
    return jsonFile;
  },
  async getJsonFile(jsonId?: string): Promise<JsonFile | undefined> {
    if (!jsonId) return undefined;
    const tempFile = jsonFileTemp.get(jsonId);
    if (tempFile) {
      return tempFile;
    }

    // 从远程服务器下载jsonFile
    // ...
  },

  /****************** 服务器远程操作 ******************/
  // // 取回服务器项目文件
  // getRemote() {
  //
  // },
  // // 保存到服务器
  // saveRemote () {
  //
  // },
  // // 从服务删除
  // deleteRemote () {
  //
  // }
};
