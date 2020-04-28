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
  externals: [
    { react: 'react', 'react-dom': 'react-dom' },
    /@material-ui\/core.*$/i,
    /@material-ui\/icons.*$/i,
  ],
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
    ],
  },
  plugins: [],
})
