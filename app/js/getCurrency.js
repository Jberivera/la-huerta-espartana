export default function getCurrency(number) {
  if (!number) return 0;
  return number.toString().replace(/(\d{0,3})?(\d{3})?(\d{3})$/g, function(_, $1, $2, $3) {
    if (!$1 && !$2 && $3) return $3;
    if ( $1 && !$2 && $3) return $1 + '.' + $3;
    if ( $1 &&  $2 && $3) return $1 + '.' + $2 + '.' + $3;
  })
}
