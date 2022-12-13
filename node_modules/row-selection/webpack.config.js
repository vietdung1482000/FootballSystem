var webpack = require('webpack');
var path = require('path');
var UnminifiedWebpackPlugin = require('unminified-webpack-plugin');
var packageJson = require('./package.json');


var config = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'row-selection.min.js',
  },
  externals: {
      jquery: 'jQuery'
  },
  watch: false,
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }),
    new UnminifiedWebpackPlugin(),
    new webpack.BannerPlugin(packageJson.name + '.js v' + packageJson.version + ' | ' + packageJson.url)
  ]
};

module.exports = config;
