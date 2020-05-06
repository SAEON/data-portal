const path = require('path')

module.exports = ({ entry, output = '/dist' }) => {
  const { NODE_ENV: mode } = process.env
  return {
    mode,
    entry: path.resolve(__dirname, entry),
    externals: [/date-fns\/.*$/i],
    output: {
      filename: 'index.js',
      libraryTarget: 'commonjs2',
      path: path.join(__dirname, output),
    },
    resolve: {
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
      ],
    },
  }
}
