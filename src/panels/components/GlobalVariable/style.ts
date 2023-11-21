import { css } from 'class-css';

export const headerStyle = css({
  padding: '8px 16px',
  borderBottom: '1px solid #e8e8e8',
  color: 'rgba(0,0,0,0.75)',
  display: 'flex',
  justifyContent: 'space-between',
});

export const itemStyle = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  cursor: 'pointer',
  '&:hover': {
    background: 'whitesmoke',
  },
});
