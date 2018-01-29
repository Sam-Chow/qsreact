const webpack = require('webpack')
const path = require('path')

const config = {
  entry: {
    qsreact: path.resolve(__dirname, 'src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
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

if (process.env.EXAMPLE) {
  config.entry.client = path.resolve(__dirname, 'example/index.js')
}

module.exports = config
