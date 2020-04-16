const webpack = require('webpack')
const path = require('path')

module.exports = ({ mode, entry, output = '/dist' }) => ({
  mode,
  entry: path.resolve(__dirname, entry),
  output: {
    filename: 'index.js',
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, output),
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  externals: {
    react: 'react',
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
})
