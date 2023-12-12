import { css } from 'class-css';

export const pageClass = css({
  position: 'absolute',
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
  background: 'whitesmoke',
  display: 'flex',
  flexDirection: 'column',
});

export const headClass = css({
  minHeight: 10,
  background: 'white',
  borderBottom: '1px solid #e8e8e8',
});

export const bodyClass = css({
  flex: 1,
  display: 'flex',
  overflow: 'hidden',
});

export const bodyLeftClass = css({
  flex: '0 0 300px',
  background: 'white',
  display: 'flex',
});

export const bodyMidClass = css({
  flex: 1,
});

export const bodyRightClass = css({
  flex: '0 0 300px',
  background: 'white',
});
