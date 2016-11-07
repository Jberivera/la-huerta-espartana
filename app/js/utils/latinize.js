const latin_map = {
  'á': 'a',
  'é': 'e',
  'í': 'i',
  'ó': 'o',
  'ú': 'u'
};

export default function latinize (str) {
  return str.replace(/[^A-Za-z0-9\[\] ]/g, (a) => latin_map[a] || a);
};
