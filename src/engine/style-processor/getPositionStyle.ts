import React from 'react';
import { isNumber, PartialNumber, UNIT_DEFAULT } from '.';

export type Position = 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';

// 文字处理类型
export type StyleProcessPosition = {
  position?: Position; // 定位
  top?: PartialNumber; // 上
  topUnit?: string; // 上 单位
  right?: PartialNumber; // 右
  rightUnit?: string; // 右 单位
  bottom?: PartialNumber; // 下
  bottomUnit?: string; // 下 单位
  left?: PartialNumber; // 左
  leftUnit?: string; // 左 单位
};
export type StyleProcessPositionKeys = keyof StyleProcessPosition;

/**
 * 删除具体定位属性
 */
const specificKeys: StyleProcessPositionKeys[] = [
  'top',
  'topUnit',
  'right',
  'rightUnit',
  'bottom',
  'bottomUnit',
  'left',
  'leftUnit',
];

export function deleteSpecificProps(data: StyleProcessPosition) {
  specificKeys.forEach((key: StyleProcessPositionKeys) => {
    delete data[key];
  });
  return data;
}

/**
 * 定位 - 样式计算
 */
export function getPositionStyle(data: StyleProcessPosition): React.CSSProperties {
  const style: React.CSSProperties = {};
  style.position = data?.position;
  if (isNumber(data?.top)) {
    style.top = `${data?.top}${data?.topUnit || UNIT_DEFAULT}`;
  }
  if (isNumber(data?.right)) {
    style.right = `${data?.right}${data?.rightUnit || UNIT_DEFAULT}`;
  }
  if (isNumber(data?.bottom)) {
    style.bottom = `${data?.bottom}${data?.bottomUnit || UNIT_DEFAULT}`;
  }
  if (isNumber(data?.left)) {
    style.left = `${data?.left}${data?.leftUnit || UNIT_DEFAULT}`;
  }
  return style;
}
