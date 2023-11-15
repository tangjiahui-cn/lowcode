/**
 * 样式面板
 *
 * At 2023/11/13
 * By TangJiaHui
 */
import { Space } from 'antd';
import { JsonNode } from '../../../data';
import Container from '../../../components-sys/Container';
import { StyleProcessorData } from '../../../core';
import LayoutStyle from './LayoutStyle';
import TextStyle from './TextStyle';
import PositionStyle from './PositionStyle';

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
      <Container title={'布局'}>
        <LayoutStyle
          jsonNode={props?.jsonNode}
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
          jsonNode={props?.jsonNode}
          onChange={(text) =>
            emitChange({
              ...props?.jsonNode?.styleData,
              text,
            })
          }
        />
      </Container>
      <Container title={'定位'} defaultExpand>
        <PositionStyle
          jsonNode={props?.jsonNode}
          onChange={(position) =>
            emitChange({
              ...props?.jsonNode?.styleData,
              position,
            })
          }
        />
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
