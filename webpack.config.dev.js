const HtmlWebPackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  entry: './index.jsx',
  output: {
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.*css$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
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
    new HtmlWebPackPlugin({
      template: './index.html',
      filename: './index.html'
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 9000,
    historyApiFallback: true,
    compress: true,
    before: function(app, server) {
      console.log("'before' callback is here")
    },
    after: function(app, server) {
      console.log("'after' callback is here")
    },
    allowedHosts: ['.localhost'],
    headers: {
      'Access-Control-Allow-Headers': '*'
    }
  }
}
