function genOptions(arr: string[]) {
  return arr.map((x) => {
    return {
      label: x,
      value: x,
    };
  });
}

export const displayOptions = genOptions(['flex']);
export const flexDirectionOptions = genOptions(['row', 'row-reverse', 'column', 'column-reverse']);
export const flexWrap = genOptions(['nowrap', 'wrap', 'wrap-reverse']);
export const justifyContent = genOptions([
  'flex-start',
  'flex-end',
  'center',
  'space-between',
  'space-around',
]);
export const alignItems = genOptions(['flex-start', 'flex-end', 'center', 'baseline', 'stretch']);
export const alignContent = genOptions([
  'flex-start',
  'flex-end',
  'center',
  'space-between',
  'space-around',
  'stretch',
]);
