var HtmlWebpackPlugin = require('html-webpack-plugin');
var LiveReloadPlugin = require('webpack-livereload-plugin');
var path = require('path');


module.exports = {
  entry: './index.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, './docs'),
    filename: 'index_bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
    template: './index.html',
  })
]
};
