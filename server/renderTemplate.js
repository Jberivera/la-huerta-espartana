module.exports = function renderTemplate (str, data) {
  return str.replace(/\{(\w+)\}/g, function (match, p1) {
    return data[p1] ? data[p1] : match;
  });
};
