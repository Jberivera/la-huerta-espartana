const webpack = require('webpack');

const path = require('path');
const merge = require('webpack-merge');

const TARGET = process.env.npm_lifecycle_event;
const DEFAULT_PORT = process.env.PORT || 3000;
const PATHS = {
  app: path.join(__dirname, 'app'),
  dist: path.join(__dirname, 'dist'),
  build: path.join(__dirname, 'build')
};

const common = {
  entry: PATHS.app,
  output: {
    path: PATHS.dist,
    filename: 'js/main.js',
    publicPath: '/dist/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel?cacheDirectory'],
        include: PATHS.app
      },
      {
        test: /\.scss$/,
        loader: 'style!css?sourceMap&modules!postcss!sass?sourceMap',
        include: PATHS.app
      }
    ]
  }
};

module.exports = merge(common, {
  dev: {
    devtool: 'eval-source-map',
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      stats: 'errors-only',
      host: process.env.HOST,
      port: process.env.PORT || DEFAULT_PORT
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  },
  build: {
    plugins: [
      new webpack.DefinePlugin({ 'process.env': { 'NODE_ENV': '"production"' }}),
      new webpack.optimize.UglifyJsPlugin()
    ]
  },
  'build:node': {
    target: 'node',
    output: {
      path: PATHS.build,
      filename: 'js/main.js'
    },
  }
}[TARGET]);
