module.exports = (ctx) => ({
  parser: ctx.parser ? 'sugarss' : false,
  map: ctx.env === 'development' ? ctx.map : false,
  from: ctx.from
  to: ctx.to
  plugins: [
    require('postcss-flexbugs-fixes'),
    require('autoprefixer')({ browsers: ['last 2 versions'] })
  ];
})
