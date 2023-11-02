import {css} from "class-css";

export default function DropHereEmpty () {
  return (
    <div
      className={css({
        width: '100%',
        pointerEvents: 'none',
        height: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'gray',
        background: '#f1f1f1',
        borderSizing: 'border-box',
        border: '1px dashed #d3d3d3'
      })}
    >
      拖拽组件到这里
    </div>
  )
}
