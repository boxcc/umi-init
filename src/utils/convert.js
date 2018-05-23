import moment from 'moment';

export function firstUpperCase(str) {
  return str.toLowerCase().replace(/( |^)[a-z]/g, L => L.toUpperCase());
}

export function convertNsToSec(value) {
  return value / (1000 * 1000 * 1000);
}

export function convertSecToNs(value) {
  return value * (1000 * 1000 * 1000);
}

export function convertMoneyToNumber(value) {
  if (isNumber(value)) {
    const price = parseFloat(value)
      .toFixed(2)
      .toString();
    const ps = price.split('.');
    const s1 = ps[0] ? ps[0] : '0';
    const s2 = ps[1] ? ps[1].slice(0, 2) : '00';
    return Number(`${s1}${s2}`);
  } else {
    return 0.0;
  }
}

export function convertNumberToMoney(value) {
  if (isNumber(value)) {
    return (Number(value) / 100).toFixed(2);
  } else {
    return 0.0;
  }
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export function getStartDateTime(currentDateTime) {
  if (moment.isMoment(currentDateTime)) {
    const startMinute = Math.ceil(currentDateTime.minutes() / 5) * 5;
    const startDateTime = currentDateTime
      .set('m', startMinute)
      .set('s', 0)
      .set('ms', 0);
    return startDateTime;
  } else {
    return false;
  }
}
