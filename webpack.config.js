const webpack = require('webpack')
const path = require('path')

const config = {
  entry: {
    client: path.resolve(__dirname, 'src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'qsreact.js',
  },
  resolve: {
    alias: {
      qsreact: path.resolve(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
}

module.exports = config
