/**
 * 运行时配置
 *
 * At 2023/12/12
 * By TangJiaHui
 */

const data = {
  maxZIndex: 1,
};

export const runtime = {
  // 最大z-index
  getMaxZIndex: () => data.maxZIndex,
  setMaxZIndex: (zIndex?: number) => {
    // 非数字返回
    if (typeof zIndex === 'number' && zIndex >= data.maxZIndex) {
      data.maxZIndex = zIndex;
    }
  },
};
