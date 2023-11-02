import {css} from "class-css";

export const btn = css({
  cursor: 'pointer',
  color: '#5594e7',
  userSelect: 'none',
  transition: 'all .3s',
  padding: '4px 0',
  '&:hover': {
    background: '#e6ebf5'
  }
})

export const btnSelect = css({
  color: 'gray',
  cursor: 'default',
  '&:hover': {
    background: 'transparent'
  }
})
