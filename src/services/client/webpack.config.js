const Dotenv = require('dotenv-webpack')
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')
const fs = require('fs')
const packageJson = require('./package.json')
// eslint-disable-next-line
const { GenerateSW } = require('workbox-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
require('dotenv').config()

let {
  NODE_ENV: mode,
  CATALOGUE_DEPLOYMENT_ENV = 'local',
  CATALOGUE_LATEST_COMMIT = '',
  CATALOGUE_CLIENT_FILTER_CONFIG_PATH = '',
} = process.env

CATALOGUE_CLIENT_FILTER_CONFIG_PATH = CATALOGUE_CLIENT_FILTER_CONFIG_PATH
  ? path.join(__dirname, CATALOGUE_CLIENT_FILTER_CONFIG_PATH)
  : path.join(__dirname, '../../../deployment-configs/next/client-filters.json')

module.exports = () => {
  const output = 'dist'

  return {
    devtool: mode === 'production' ? false : false, // I haven't been able to get source maps to work nicely
    target: mode === 'production' ? ['web', 'es5'] : 'web',
    mode,
    entry: {
      index: './src/index.jsx',
    },
    output: {
      filename: '[name].[contenthash].js',
      chunkFilename: '[name].[contenthash].js',
      path: path.join(__dirname, output),
      publicPath: '/',
      assetModuleFilename: 'assets/[hash][ext][query]',
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      alias: {

        /**
         * Webpack doesn't seem to respect the package.json
         * exports field. That is why saeon packages are 
         * referenced by dist folder, and not just the 
         * package
         */

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

        // @saeon/quick-form
        '@saeon/quick-form': path.resolve(
          __dirname,
          mode === 'production' ? './node_modules/@saeon/quick-form/dist/esm' : '../../packages/quick-form/dist/esm'
        ),

        // @saeon/snap-menus
        '@saeon/snap-menus': path.resolve(
          __dirname,
          mode === 'production' ? './node_modules/@saeon/snap-menus/dist/esm' : '../../packages/snap-menus/dist/esm'
        ),

        // @saeon/ol-react
        '@saeon/ol-react': path.resolve(
          __dirname,
          mode === 'production' ? './node_modules/@saeon/ol-react/dist/esm' : '../../packages/ol-react/dist/esm'
        ),

        // @saeon/logger
        '@saeon/logger': path.resolve(
          __dirname,
          mode === 'production' ? './node_modules/@saeon/logger' : '../../packages/logger'
        ),
      },
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
      // new BundleAnalyzerPlugin()
    ].filter(_ => _),
    devServer: {
      contentBase: path.join(__dirname, output),
      historyApiFallback: {
        disableDotRule: true,
      },
      compress: true,
    },
  }
}
