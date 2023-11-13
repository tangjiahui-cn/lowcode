/**
 * 样式面板
 *
 * At 2023/11/13
 * By TangJiaHui
 */
import { Space } from 'antd';
import { JsonNode } from '../../../data';
import Container from '../../../components-sys/Container';
import LayoutStyle from './LayoutStyle';
import TextStyle from './TextStyle';
import { StyleProcessorData } from '../../../core';

interface IProps {
  jsonNode?: JsonNode;
  onChange?: (styleProcessData?: StyleProcessorData) => void;
}
export default function (props: IProps) {
  function emitChange(styleProcessData: StyleProcessorData) {
    props?.onChange?.(styleProcessData);
  }

  return (
    <Space style={{ width: '100%' }} direction={'vertical'}>
      <Container title={'布局'} defaultExpand>
        <LayoutStyle
          value={props?.jsonNode?.styleData?.layout}
          onChange={(layout) =>
            emitChange({
              ...props?.jsonNode?.styleData,
              layout,
            })
          }
        />
      </Container>
      <Container title={'文字'}>
        <TextStyle
          value={props?.jsonNode?.styleData?.text}
          onChange={(text) =>
            emitChange({
              ...props?.jsonNode?.styleData,
              text,
            })
          }
        />
      </Container>
      <Container title={'定位'}>
        <div>类型</div>
      </Container>
      <Container title={'边框'}>
        <div>粗细</div>
        <div>颜色</div>
        <div>圆角</div>
        <div>类型</div>
      </Container>
    </Space>
  );
}
