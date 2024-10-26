export const toArray = <T>(value: T | T[] | undefined) =>
  Array.isArray(value) ? value : value === undefined ? undefined : [value];
