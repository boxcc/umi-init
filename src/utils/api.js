export function getDefualtParams(params) {
  return {
    ...params,
    limit: process.env.PAGESIZE,
  };
}

export function checkFormat(data) {
  return !!(data &&
    Object.prototype.hasOwnProperty.call(data, 'list') &&
    Object.prototype.hasOwnProperty.call(data, 'pagination'));
}

export function hasError(data) {
  return !!(data && Object.prototype.hasOwnProperty.call(data, 'error'));
}
