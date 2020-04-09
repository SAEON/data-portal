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
    ol: 'ol',
    'ol/control.js': 'ol/control.js',
    'ol/layer/Group': 'ol/layer/Group',
    'ol/format': 'ol/format',
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
