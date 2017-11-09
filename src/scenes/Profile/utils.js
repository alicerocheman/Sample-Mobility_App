export const isEmpty = obj =>
  Object.getOwnPropertyNames(obj).length === 0 &&
  !(typeof obj === 'boolean') &&
  !(typeof obj === 'number');
