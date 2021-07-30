const Dotenv = require('dotenv-webpack')
const webpack = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')
const fs = require('fs')
const loadEntryPoints = require('./load-entry-points.js')
const loadAliases = require('./load-aliases.js')
const packageJson = require('../package.json')
// eslint-disable-next-line
const { GenerateSW } = require('workbox-webpack-plugin')
// eslint-disable-next-line
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
require('dotenv').config()

const ROOT = path.normalize(path.join(__dirname, '../'))

let {
  NODE_ENV: mode,
  CATALOGUE_DEPLOYMENT_ENV = 'local',
  CATALOGUE_LATEST_COMMIT = '',
  CATALOGUE_CLIENT_FILTER_CONFIG_PATH = '',
} = process.env

CATALOGUE_CLIENT_FILTER_CONFIG_PATH = CATALOGUE_CLIENT_FILTER_CONFIG_PATH
  ? path.join(ROOT, CATALOGUE_CLIENT_FILTER_CONFIG_PATH)
  : path.join(ROOT, '../../deployment-configs/next/client-filters.json')

module.exports = () => {
  const output = 'dist'

  return {
    devtool: mode === 'production' ? false : false, // I haven't been able to get source maps to work nicely
    target: mode === 'production' ? ['web', 'es5'] : 'web',
    mode,
    entry: {
      search: path.join(ROOT, 'src/entry-points/search/index.jsx'),
      render: path.join(ROOT, 'src/entry-points/render/index.jsx'),
    },
    output: {
      filename: '[name].[contenthash].js',
      chunkFilename: '[name].[contenthash].js',
      path: path.join(ROOT, output),
      publicPath: '/',
      assetModuleFilename: 'assets/[hash][ext][query]',
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      alias: loadAliases(mode),
    },
    optimization: {
      minimize: ['local', 'development'].includes(CATALOGUE_DEPLOYMENT_ENV) ? false : true,
      splitChunks: { chunks: 'all' },
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: mode === 'production' ? /@babel(?:\/|\\{1,2})runtime|core-js/ : /node_modules/,
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
          type: 'asset/resource',
        },
        {
          test: /\.svg$/,
          use: ['@svgr/webpack'],
        },
        {
          test: /\.(png|jpg|gif)$/,
          type: 'asset/inline',
        },
      ],
    },
    plugins: [
      new Dotenv(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(mode),
        'process.env.CATALOGUE_LATEST_COMMIT': JSON.stringify(CATALOGUE_LATEST_COMMIT),
        'process.env.CATALOGUE_DEPLOYMENT_ENV': JSON.stringify(CATALOGUE_DEPLOYMENT_ENV),
        'process.env.CATALOGUE_CLIENT_BACKGROUNDS': JSON.stringify(
          fs
            .readdirSync('public/bg')
            .filter(f => ['.jpg', '.jpeg'].includes(f.match(/\.[0-9a-z]{1,5}$/i)?.[0] || undefined))
            .join(',')
        ),
        'process.env.CATALOGUE_CLIENT_FILTER_CONFIG': JSON.stringify(
          fs.readFileSync(CATALOGUE_CLIENT_FILTER_CONFIG_PATH, { encoding: 'utf8' }).toString()
        ),
        'process.env.PACKAGE_DESCRIPTION': JSON.stringify(packageJson.description),
        'process.env.PACKAGE_KEYWORDS': JSON.stringify(packageJson.keywords),
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(ROOT, './public'),
            to: path.resolve(ROOT, './dist'),
          },
        ],
      }),
      // mode === 'production' ? new GenerateSW({}) : null,
      // new BundleAnalyzerPlugin()
      ...loadEntryPoints(output),
    ].filter(_ => _),
    devServer: {
      contentBase: path.join(ROOT, output),
      historyApiFallback: {
        disableDotRule: true,
        rewrites: [
          { from: /^\/render/, to: '/render.html' },
          { from: /./, to: '/search.html' },
        ],
      },
      compress: true,
    },
  }
}
