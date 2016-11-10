const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

const srcJs = path.resolve(process.cwd(), 'src', 'js');
const babelSettings = JSON.parse(fs.readFileSync('.babelrc'));

const config = {
  context: process.cwd() + '/src/js',
  entry: {},
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query: babelSettings,
      },
    ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(process.cwd(), 'dist', 'js'),
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
  ]
};

fs.readdirSync('src/js').map((file) => {
  if (file.endsWith('.js')) {
    const name = file.slice(0, -3);
    config.entry[name] = `./${name}`;
  }
});

module.exports = config;
