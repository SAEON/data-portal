const Dotenv = require('dotenv-webpack')
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')
require('dotenv').config()

module.exports = ({ mode, entry, output = '/dist' }) => {
  return {
    mode,
    entry: path.resolve(__dirname, entry),
    output: {
      filename: 'index.js',
      path: path.join(__dirname, output),
    },
    resolve: {
      alias: {
        ol: path.resolve(__dirname, './node_modules/ol'),
        'ol/control.js': path.resolve(__dirname, './node_modules/ol/control.js'),
        'ol/format': path.resolve(__dirname, './node_modules/ol/format'),
        react: path.resolve(__dirname, './node_modules/react'),
        'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
        '@material-ui/core': path.resolve(__dirname, './node_modules/@material-ui/core'),
        '@material-ui/icons': path.resolve(__dirname, './node_modules/@material-ui/icons'),
        '@saeon/snap-menus': path.resolve(__dirname, '../snap-menus/src/index'),
        '@saeon/ol-react': path.resolve(
          __dirname,
          mode === 'production' ? './node_modules/@saeon/ol-react' : '../ol-react/src/index'
        ),
        '@saeon/catalogue-search': path.resolve(
          __dirname,
          mode === 'production'
            ? './node_modules/@saeon/catalogue-search'
            : '../catalogue-search/src/index'
        ),
      },
      extensions: ['.js', '.jsx'],
    },
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
          test: /\.svg$/,
          use: ['@svgr/webpack'],
        },
        {
          test: /\.(png|jpg|gif)$/,
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
    plugins: [
      new Dotenv(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(mode),
      }),
      new CopyPlugin([
        {
          from: path.resolve(__dirname, './public'),
          to: path.resolve(__dirname, './dist'),
        },
      ]),
      new HtmlWebPackPlugin({
        template: 'index.html',
        filename: path.join(__dirname, output, 'index.html'),
        PUBLIC_PATH: '',
      }),
    ],
    devServer: {
      contentBase: path.join(__dirname, output),
      historyApiFallback: true,
      compress: true,
      allowedHosts: ['.localhost'],
      headers: {
        'Access-Control-Allow-Headers': '*',
      },
    },
  }
}
