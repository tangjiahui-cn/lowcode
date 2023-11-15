import { css } from 'class-css';

export const container = css({
  position: 'absolute',
  top: -10,
  left: 0,
  width: 100,
  maxHeight: 185,
  overflowY: 'auto',
  '::-webkit-scrollbar': {
    display: 'none',
  },
});

export const item = css({
  padding: '2px 8px',
  cursor: 'pointer',
  background: 'rgba(0,0,0,0.65)',
  '& + &': {
    marginTop: 2,
  },
  '&:hover': {
    background: 'rgba(0,0,0,0.50)',
  },
});
