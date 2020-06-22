const webpack = require('webpack')
const path = require('path')

module.exports = ({ output = '/dist' }) => {
  const { NODE_ENV: mode } = process.env

  return {
    mode,
    entry: {
      index: './src/index.js',
      catalogue: './src/catalogue-search/index.js',
      catalogueReact: './src/catalogue-search-react/index.js',
    },
    output: {
      filename: '[name].js',
      libraryTarget: 'commonjs2',
      path: path.join(__dirname, output),
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    externals: [{ react: 'react' }],
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
      ],
    },
    plugins:
      mode === 'production'
        ? []
        : [
            new webpack.ProvidePlugin({
              fetch: 'imports?this=>global!exports?global.fetch!node-fetch',
            }),
          ],
  }
}
