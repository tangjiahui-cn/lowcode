import { css } from 'class-css';

export const container = css({
  width: '100%',
});

export const block = css({
  width: '50%',
  height: 80,
  display: 'inline-flex',
  boxSizing: 'border-box',
  borderBottom: '1px solid #e8e8e8',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  userSelect: 'none',
  fontSize: 14,
  '&:nth-child(-n + 2)': {
    borderTop: '1px solid #e8e8e8',
  },
  '&:nth-child(2n + 1)': {
    borderRight: '1px solid #e8e8e8',
  },
  '&:hover': {
    background: '#f6f6f6',
  },
});
