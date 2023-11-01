import {css} from "class-css";

export const pageStyle = css({
  position: 'absolute',
  left: 0,
  top: 0,
  background: 'white',
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden'
})

export const pageHead = css({
  flex: '0 0 48px',
  borderBottom: '1px solid #e8e8e8'
})

export const pageBody = css({
  flex: 1,
  display: 'flex',
  overflow: 'hidden'
})

export const pageBodyLeft = css({
  flex: '0 0 300px',
  borderRight: '1px solid #e8e8e8',
  overflowY: 'auto'
})

export const pageBodyMid = css({
  flex: 1,
  padding: 20,
  overflow: 'auto',
  background: 'whitesmoke'
})

export const pageBodyRight = css({
  flex: '0 0 300px',
  borderLeft: '1px solid #e8e8e8'
})
