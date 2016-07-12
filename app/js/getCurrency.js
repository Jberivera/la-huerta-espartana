// function getCurrency(number) {
//   if (!number) return 0;
//   return number.toString().replace(/(\d{0,3})?(\d{3})?(\d{3})$/g, function(_, $1, $2, $3) {
//     if (!$1 && !$2 && $3) return $3;
//     if ( $1 && !$2 && $3) return $1 + '.' + $3;
//     if ( $1 &&  $2 && $3) return $1 + '.' + $2 + '.' + $3;
//   })
// }

function getCurrency(number) {
  return number = number + ' ', number.replace(/(\d)(?=(\d{3})+\s)/g, '$1.').trim();
}

export default getCurrency;
