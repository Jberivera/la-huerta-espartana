const MIN = 3;
const MAX = 8;

function isValidDate (a, b) {
  const min = new Date(a);
  const max = new Date(a);

  min.setDate(min.getDate() + MIN);
  max.setDate(max.getDate() + MAX);

  return b >= min && b <= max;
}

export default isValidDate;
