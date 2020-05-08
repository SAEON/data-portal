const path = require('path')

module.exports = ({ output = '/dist' }) => {
  const { NODE_ENV: mode } = process.env
  return {
    mode,
    entry: {
      index: './src/index.js',
      'log-to-graphql': './src/log-to-graphql.js',
      'log-to-http': './src/log-to-http.js',
    },
    output: {
      filename: '[name].js',
      libraryTarget: 'commonjs2',
      path: path.join(__dirname, output),
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    externals: [/@apollo\/client.*$/i, /date-fns\/.*$/i],
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
