const Dotenv = require('dotenv-webpack')
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')
const fs = require('fs')
const packageJson = require('./package.json')
// const { GenerateSW } = require('workbox-webpack-plugin')
const { execSync } = require('child_process')
require('dotenv').config()

const { NODE_ENV: mode, DEPLOYMENT_ENV } = process.env
var LATEST_COMMIT
try {
  LATEST_COMMIT = execSync('git rev-parse HEAD').toString().trim()
} catch {
  LATEST_COMMIT = 'UNKNOWN' // TODO - seems like I don't have access to git in the runner context
}

module.exports = () => {
  const output = 'dist'
  return {
    mode,
    entry: {
      index: './src/index.jsx',
    },
    output: {
      filename: '[name].[contenthash].js',
      chunkFilename: '[name].[contenthash].js',
      path: path.join(__dirname, output),
      publicPath: '/',
    },
    resolve: {
      alias: {
        // OpenLayers
        'ol/control': path.resolve(__dirname, './node_modules/ol/control'),
        'ol/format': path.resolve(__dirname, './node_modules/ol/format'),
        'ol/layer/Group': path.resolve(__dirname, './node_modules/ol/layer/Group'),
        'ol/View': path.resolve(__dirname, './node_modules/ol/View'),
        'ol/Map': path.resolve(__dirname, './node_modules/ol/Map'),

        // clsx
        clsx: path.resolve(__dirname, './node_modules/clsx'),

        // Apollo
        '@apollo/client': path.resolve(__dirname, './node_modules/@apollo/client'),

        // Material UI
        '@material-ui/core': path.resolve(__dirname, './node_modules/@material-ui/core'),
        '@material-ui/icons': path.resolve(__dirname, './node_modules/@material-ui/icons'),

        // React
        react: path.resolve(__dirname, './node_modules/react'),
        'react-dom': path.resolve(__dirname, './node_modules/react-dom'),

        // @saeon
        '@saeon/quick-form': path.resolve(
          __dirname,
          mode === 'production'
            ? './node_modules/@saeon/quick-form'
            : '../../packages/quick-form/src'
        ),
        '@saeon/pkce-client': path.resolve(
          __dirname,
          mode === 'production'
            ? './node_modules/@saeon/pkce-client'
            : '../../packages/pkce-client/src'
        ),
        '@saeon/snap-menus': path.resolve(
          __dirname,
          mode === 'production' ? './node_modules/@saeon/snap-menus' : '../../packages/snap-menus'
        ),
        '@saeon/ol-react': path.resolve(
          __dirname,
          mode === 'production' ? './node_modules/@saeon/ol-react' : '../../packages/ol-react/src'
        ),
        // '@saeon/catalogue-search': path.resolve(
        //   __dirname,
        //   mode === 'production'
        //     ? './node_modules/@saeon/catalogue-search/dist/catalogueReact'
        //     : '../../packages/catalogue-search/src'
        // ),
        '@saeon/logger': path.resolve(
          __dirname,
          mode === 'production' ? './node_modules/@saeon/logger/dist' : '../../packages/logger/src'
        ),
      },
      extensions: ['.js', '.jsx'],
    },
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        minSize: 0,
        minChunks: 1,
        maxInitialRequests: Infinity,
        automaticNameDelimiter: '~',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: module =>
              `npm.${module.context
                .match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
                .replace('@', '')}`,
          },
          saeon: {
            minChunks: 2,
            reuseExistingChunk: true,
          },
        },
      },
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: mode === 'production' ? undefined : /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
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
        'process.env.LATEST_COMMIT': JSON.stringify(LATEST_COMMIT),
        'process.env.DEPLOYMENT_ENV': JSON.stringify(DEPLOYMENT_ENV),
        'process.env.BACKGROUNDS': JSON.stringify(
          fs
            .readdirSync('public/bg')
            .filter(f => ['.jpg', '.jpeg'].includes(f.match(/\.[0-9a-z]{1,5}$/i)?.[0] || undefined))
            .join(',')
        ),
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, './public'),
            to: path.resolve(__dirname, './dist'),
          },
        ],
      }),
      // mode === 'production' ? new GenerateSW({}) : null,
      new HtmlWebPackPlugin({
        template: 'index.html',
        filename: path.join(__dirname, output, 'index.html'),
        PUBLIC_PATH: '',
        PACKAGE_DESCRIPTION: packageJson.description,
        PACKAGE_KEYWORDS: packageJson.keywords,
      }),
    ].filter(_ => _),
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
