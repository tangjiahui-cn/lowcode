export const fontWeightOptions = [
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
].map((x) => ({ label: x, value: x }));

export const textAlignOptions = ['start', 'end', 'center', 'justify'].map((x) => ({
  label: x,
  value: x,
}));

export const verticalAlignOptions = ['baseline', 'top', 'middle', 'bottom', 'sub', 'text-top'].map(
  (x) => ({
    label: x,
    value: x,
  }),
);
