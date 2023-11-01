import {Input} from "antd";
import {Base} from "../../data";

export interface Attributes {
  value: string;
}

export interface IProps {
  attributes: Attributes;
  base: Base;
}

/**
 * 文本输入框
 *
 * At 2023/10/31
 * By TangJiaHui
 */
export default function (props: IProps) {
  return (
    <Input.TextArea
      defaultValue={props?.attributes?.value}
    />
  )
}
