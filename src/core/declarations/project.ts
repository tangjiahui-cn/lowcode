/**
 * 项目管理声明
 *
 * At 2023/12/07
 * By TangJiaHui
 */
import { JsonNode } from '@/core';

export interface Page {
  pageId: string; // 页面id
  pageName: string; // 页面名称
  route: string; // 唯一路由
  json: JsonNode[]; // 页面json
  // 绑定布局
  bindLayoutId?: string; // 绑定布局id
  bindLayoutVisible?: boolean; // 是否显示布局
}

// 布局
export interface Layout {
  layoutId: string; // 布局id
  layoutName: string; // 布局名称
  json: JsonNode[]; // 页面json
}

// 项目存储
export interface Project {
  projectName: string; // 项目名称
  projectId: string; // 项目id

  layouts: Layout[];
  pages: Page[];
}
