/**
 * 项目管理声明
 *
 * At 2023/12/07
 * By TangJiaHui
 */
import { JsonNode } from '@/core';

export interface JsonFile {
  jsonId: string;
  jsonData: JsonNode[];
}

export interface Page {
  pageId: string; // 页面id
  pageName: string; // 页面名称
  route: string; // 唯一路由

  // 对应数据文件id
  jsonId: string; // 存放的页面json文件id

  // 绑定布局
  layoutId?: string; // 绑定布局id
  layoutVisible?: boolean; // 是否显示布局
}

// 布局
export interface Layout {
  layoutId: string; // 布局id
  layoutName: string; // 布局名称

  // 对应数据文件id
  jsonId: string; // 存放的页面json文件id
}

export interface Project {
  projectName: string; // 项目名称
  projectId: string; // 项目id

  layouts: Layout[];
  pages: Page[];
}
