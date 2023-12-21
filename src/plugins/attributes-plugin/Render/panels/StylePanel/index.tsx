/**
 * 样式面板
 *
 * At 2023/11/13
 * By TangJiaHui
 */
import { Space } from 'antd';
import Container from './components/Container';
import { StyleProcessorData, JsonNode } from '@/engine';
import LayoutStyle from './LayoutStyle';
import TextStyle from './TextStyle';
import PositionStyle from './PositionStyle';
import BorderStyle from './BorderStyle';
import { tips } from './tips';

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
      <Container title={'布局'} defaultExpand tips={tips.layout}>
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
      <Container title={'定位'}>
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
        <BorderStyle
          jsonNode={props?.jsonNode}
          onChange={(border) =>
            emitChange({
              ...props?.jsonNode?.styleData,
              border,
            })
          }
        />
      </Container>
    </Space>
  );
}
