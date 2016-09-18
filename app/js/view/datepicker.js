export const isLeapYear = (function () {
  let leapYear = {};

  return function (year) {
    return typeof leapYear[year] === 'boolean' ? leapYear[year] : leapYear[year] = year % 4 === 0 && year % 100 !== 0 || year % 400 === 0, leapYear[year];
  };
}());

export function getNumberOfDays (year, month) {
  return [31, (isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
}

export function getDate () {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.timeString = /(?:\w{4})-(?:\w{2})-(?:\w{2})/.exec(date.toISOString())[0];
  return date;
}
