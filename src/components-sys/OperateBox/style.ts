import { css } from 'class-css';

export const btn = css({
  background: '#3877ec',
  fontSize: 18,
  padding: '4px 4px',
  cursor: 'pointer',
  '&:hover': {
    background: '#5789e8',
  },
});

export const name = css({
  maxWidth: 100,
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  padding: '0 6px',
  letterSpacing: 2,
  cursor: 'pointer',
  borderRight: '1px solid #e8e8e8',
});
