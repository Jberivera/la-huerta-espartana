function compose () {
  var slice = Array.prototype.slice,
      fns = slice.call(arguments);

  return fns.reduceRight(function(g, f) {
    return function () {
      return f(g.apply(this, arguments));
    };
  });
};

export default compose;
