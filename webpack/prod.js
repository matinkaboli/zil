const { resolve } = require('path');
const babelConfig = require('./babel.config.json');
const nodeExternals = require('webpack-node-externals');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  output: {
    filename: 'app.js',
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
          presets: babelConfig.presets,
          plugins: babelConfig.plugins,
        },
      },
    ],
  },
  resolve: {
    alias: {
      Root: resolve(__dirname, '../', 'src'),
    },
  },
  target: 'node',
  externals: [nodeExternals()],
  node: {
    __dirname: false,
  },
  plugins: [
    new UglifyJsPlugin({
      cache: true,
    }),
  ],
};
