import ComponentMenu from "./ComponentMenu";
import MenuList, {MenuType} from "./MenuList";
import {useState} from "react";
import JsonEditorMenu from "./JsonEditorMenu";
import ComponentTreeMenu from "./ComponentTreeMenu";

/**
 * 左侧菜单项
 *
 * At 2023/11/03
 * By TangJiaHui
 */
export default function () {
  const [menuType, setMenuType] = useState<MenuType>(MenuType.componentList);

  return (
    <div style={{display: 'flex', height: '100%', overflowY: 'hidden'}}>
      <div style={{borderRight: '1px solid #e8e8e8', overflowY: 'auto'}}>
        <MenuList
          value={menuType}
          onChange={setMenuType}
        />
      </div>
      <div style={{flex: 1, overflowY: 'auto'}}>
        {menuType === MenuType.componentList && <ComponentMenu />}
        {menuType === MenuType.jsonEditor && <JsonEditorMenu />}
        {menuType === MenuType.componentTree && <ComponentTreeMenu />}
      </div>
    </div>
  )
}
