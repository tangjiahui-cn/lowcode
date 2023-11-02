import {css} from "class-css";

export const btn = css({
  cursor: 'pointer',
  color: '#5594e7',
  userSelect: 'none',
  transition: 'all .3s',
  boxSizing: 'border-box',
  padding: '4px 8px',
  border: '1px solid transparent',
  '&:hover': {
    background: '#e6ebf5',
    textDecoration: 'underline'
  }
})

export const btnSelect = css({
  color: 'gray',
  cursor: 'default',
  border: '1px solid #e8e8e8',
  '&:hover': {
    background: 'transparent',
    textDecoration: 'none'
  }
})
