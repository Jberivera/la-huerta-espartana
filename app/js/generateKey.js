export default function generateKey(number) {
  let length = 3 - number.toString().length;
  return `${Array(length + 1).join('0')}${number}`;
}
