import { pageBody, pageBodyLeft, pageBodyMid, pageBodyRight, pageHead, pageStyle } from './style';
import Config from '../panels/config';
import Components from '../panels/components';
import Editor from '../panels/editor';
import Attributes from '../panels/attributes';
/**
 * 演示页面
 *
 * At 2023/10/31
 * By TangJiaHui
 */

export default function App() {
  return (
    <div className={pageStyle}>
      <div className={pageHead}>
        <Config />
      </div>
      <div className={pageBody}>
        <div className={pageBodyLeft}>
          <Components />
        </div>
        <div className={pageBodyMid}>
          <Editor />
        </div>
        <div className={pageBodyRight}>
          <Attributes />
        </div>
      </div>
    </div>
  );
}
