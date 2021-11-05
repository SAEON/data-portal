const Dotenv = require('dotenv-webpack')
const webpack = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')
const fs = require('fs')
const packageJson = require('../package.json')
const path = require('path')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// const { GenerateSW } = require('workbox-webpack-plugin')
const loadEntryPoints = require('./load-entry-points.js')
require('dotenv').config()

let {
  NODE_ENV: mode,
  DEPLOYMENT_ENV = 'local',
  CLIENTS_SEARCH_FILTER_CONFIG_PATH = '',
  SUBDOMAIN_APP_ENTRIES = '',
} = process.env

module.exports = (ROOT, output) => {
  CLIENTS_SEARCH_FILTER_CONFIG_PATH = CLIENTS_SEARCH_FILTER_CONFIG_PATH
    ? path.join(ROOT, CLIENTS_SEARCH_FILTER_CONFIG_PATH)
    : path.join(ROOT, '../../deploy/next/config/client-filters.json')

  return [
    new Dotenv(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(mode),
      'process.env.DEPLOYMENT_ENV': JSON.stringify(DEPLOYMENT_ENV),
      'process.env.CATALOGUE_CLIENT_BACKGROUNDS': JSON.stringify(
        fs
          .readdirSync('public/bg')
          .filter(f => ['.jpg', '.jpeg'].includes(f.match(/\.[0-9a-z]{1,5}$/i)?.[0] || undefined))
          .join(',')
      ),
      'process.env.SUBDOMAIN_APP_ENTRIES': JSON.stringify(SUBDOMAIN_APP_ENTRIES),
      'process.env.CATALOGUE_CLIENT_FILTER_CONFIG': JSON.stringify(
        fs.readFileSync(CLIENTS_SEARCH_FILTER_CONFIG_PATH, { encoding: 'utf8' }).toString()
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
    // new BundleAnalyzerPlugin(),
    ...loadEntryPoints(ROOT, output),
  ].filter(_ => _)
}
