const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const path = require('path');

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
  },
  postcss: function () {
    return [
      require('postcss-flexbugs-fixes'),
      require('autoprefixer')({ browsers: ['last 2 versions'] })
    ];
  }
};

module.exports = Object.assign(common, {
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
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({ 'process.env': { 'NODE_ENV': '"development"' }})
    ]
  },
  build: {
    module: {
      loaders: [
        {
          test: /\.js$/,
          loaders: ['babel?cacheDirectory'],
          include: PATHS.app
        },
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract('style!css?modules!postcss!sass', 'css?modules!postcss!sass'),
          include: PATHS.app
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({ 'process.env': { 'NODE_ENV': '"production"' }}),
      new ExtractTextPlugin('css/[name].css?[hash]-[chunkhash]-[contenthash]-[name]', { allChunks: true }),
      new webpack.optimize.UglifyJsPlugin()
    ]
  },
  'build:node': {
    target: 'node',
    output: {
      path: PATHS.build,
      filename: 'js/main.js',
      libraryTarget: 'commonjs2'
    },
  }
}[TARGET]);
