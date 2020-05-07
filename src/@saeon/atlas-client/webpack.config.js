const Dotenv = require('dotenv-webpack')
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')
const packageJson = require('./package.json')
require('dotenv').config()

module.exports = ({ entry, output = '/dist' }) => {
  const { NODE_ENV: mode } = process.env
  return {
    mode,
    entry: path.resolve(__dirname, entry),
    output: {
      filename: 'index.js',
      path: path.join(__dirname, output),
    },
    resolve: {
      alias: {
        // ol: path.resolve(__dirname, './node_modules/ol'),
        // 'ol/control.js': path.resolve(__dirname, './node_modules/ol/control.js'),
        // 'ol/format': path.resolve(__dirname, './node_modules/ol/format'),
        '@material-ui/core': path.resolve(__dirname, './node_modules/@material-ui/core'),
        '@material-ui/icons': path.resolve(__dirname, './node_modules/@material-ui/icons'),
        react: path.resolve(__dirname, './node_modules/react'),
        'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
        '@saeon/snap-menus': path.resolve(
          __dirname,
          mode === 'production' ? './node_modules/@saeon/snap-menus' : '../snap-menus/src/index'
        ),
        '@saeon/ol-react': path.resolve(
          __dirname,
          mode === 'production' ? './node_modules/@saeon/ol-react' : '../ol-react/src/index'
        ),
        '@saeon/catalogue-search': path.resolve(
          __dirname,
          mode === 'production'
            ? './node_modules/@saeon/catalogue-search/dist/catalogueReact'
            : '../catalogue-search/src/index'
        ),
        '@saeon/logger': path.resolve(
          __dirname,
          mode === 'production' ? './node_modules/@saeon/logger' : '../logger/src/index'
        ),
      },
      extensions: ['.js', '.jsx'],
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          default: false,
          vendors: false,
          vendor: {
            chunks: 'all',
            test: /node_modules/,
            priority: 20,
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'async',
            priority: 10,
            reuseExistingChunk: true,
            enforce: true,
          },
        },
      },
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
              envName: mode,
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
        PACKAGE_DESCRIPTION: packageJson.description,
        PACKAGE_KEYWORDS: packageJson.keywords,
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
