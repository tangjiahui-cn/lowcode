import { css } from 'class-css';

export const eventContainerStyle = css({
  border: '1px solid #e8e8e8',
});

export const textStyle = css({
  flex: 1,
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
});

export const itemStyle = css({
  padding: '8px 12px',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  '&:hover': {
    background: 'whitesmoke',
  },
});
