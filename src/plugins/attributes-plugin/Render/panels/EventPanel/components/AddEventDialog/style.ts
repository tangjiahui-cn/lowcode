import { css } from 'class-css';

// const selectPrimary = 'gray';
// const selectBg = '#e8e8e8';
// const hoverPrimary = '#a4a4a4';
// const hoverBg = 'whitesmoke';
const selectPrimary = 'rgb(56, 119, 236)';
const selectBg = 'rgba(53, 144, 255, 0.08)';
const hoverPrimary = 'rgb(56, 119, 236, 0.7)';
const hoverBg = 'rgba(53, 144, 255, 0.05)';

export const itemClass = css({
  cursor: 'pointer',
  padding: '6px 12px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderLeft: '3px solid transparent',
  userSelect: 'none',
  '&:hover': {
    background: hoverBg,
    borderLeft: `3px solid ${hoverPrimary}`,
  },
});

export const itemSelectClass = css({
  background: selectBg,
  color: selectPrimary,
  borderLeft: `3px solid ${selectPrimary}`,
});
