const Dotenv = require('dotenv-webpack')
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const path = require('path')
require('dotenv').config()

module.exports = ({ pluginsCb = null, resolveCb = null, externalsCb = null, outputCb = null, targetCb = null }) => ({
  mode,
  entry,
  output = '/dist',
}) => ({
  mode,
  entry: path.resolve(__dirname, entry),
  output: outputCb
    ? outputCb({ mode, output: path.join(__dirname, output) })
    : {
        filename: 'index.js',
        path: path.join(__dirname, output),
      },
  resolve: {
    ...(resolveCb ? resolveCb(mode) : {}),
    extensions: ['.js', '.jsx'],
  },
  externals: externalsCb ? externalsCb(mode) : {},
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            rootMode: 'upward',
          },
        },
      },
      {
        test: /\.*css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              fallback: 'file-loader',
              name: '[name][md5:hash].[ext]',
              outputPath: 'assets/',
              publicPath: '/assets/',
            },
          },
        ],
      },
    ],
  },
  plugins: pluginsCb(
    [
      new Dotenv(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(mode),
      }),
      new HtmlWebPackPlugin({
        template: 'index.html',
        filename: path.join(__dirname, output, '/index.html'),
        PUBLIC_PATH: '',
      }),
    ],
    mode
  ),
  devServer: {
    contentBase: path.join(__dirname, output),
    historyApiFallback: true,
    compress: true,
    allowedHosts: ['.localhost'],
    headers: {
      'Access-Control-Allow-Headers': '*',
    },
  },
})
