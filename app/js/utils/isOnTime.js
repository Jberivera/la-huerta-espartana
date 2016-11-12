function isOnTime(dateArg, minuts) {
  const cureentDate = new Date();
  dateArg = new Date(dateArg);

  dateArg.setMinutes(dateArg.getMinutes() + minuts);
  return !!(dateArg > cureentDate);
}

export default isOnTime;
