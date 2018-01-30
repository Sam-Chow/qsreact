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
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const configForExample = {
    entry: {
      client: path.resolve(__dirname, 'example/index.js'),
    },
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: '[name].js',
    },
    devServer: {
      inline: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'example for qsreact',
        template: path.resolve(__dirname, 'example/index.html'),
      }),
    ],
  }
  Object.assign(config, configForExample)
}

module.exports = config
