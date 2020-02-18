const HtmlWebPackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = ({plugins = []}) => ({ mode, entry, output = '/dist', port }) => ({
  mode,
  entry: path.resolve(__dirname, entry),
  output: {
    filename: 'index.js',
    path: path.join(__dirname, output)
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  externals: {},
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            rootMode: "upward",
          }
        }
      },
      {
        test: /\.*css$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              fallback: 'file-loader',
              name: '[name][md5:hash].[ext]',
              outputPath: 'assets/',
              publicPath: '/assets/'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    ...plugins,
    new HtmlWebPackPlugin({
      template: 'index.html',
      filename: path.join(__dirname, output, '/index.html')
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, output),
    port: parseInt(port),
    historyApiFallback: true,
    compress: true,
    allowedHosts: ['.localhost'],
    headers: {
      'Access-Control-Allow-Headers': '*'
    }
  }
})
