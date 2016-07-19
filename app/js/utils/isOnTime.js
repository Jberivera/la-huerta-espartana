/**
 * isOnTime - description
 *
 * @param  {type} dateArg description
 * @param  {type} minuts  description
 * @return {type}         description
 */
function isOnTime(dateArg, minuts) {
  var cureentDate = new Date();

  dateArg.setMinutes(dateArg.getMinutes() + minuts);
  return !!(dateArg > cureentDate);
}

export default isOnTime;
