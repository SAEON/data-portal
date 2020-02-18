const HtmlWebPackPlugin = require('html-webpack-plugin')
const path = require('path')


module.exports = ({
  pluginsCb = null,
  resolveCb = null,
  externalsCb = null,
  outputCb = null
}) => ({
  mode,
  entry,
  output = '/dist',
  port
}) => ({
  mode,
  entry: path.resolve(__dirname, entry),
  output: outputCb ? outputCb({mode, output}) : {
    filename: 'index.js',
    path: path.join(__dirname, output)
  },
  resolve: {
    ...(resolveCb ? resolveCb(mode) : {}),
    extensions: ['.js', '.jsx']
  },
  externals: externalsCb ? externalsCb(mode) : {},
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
  plugins: pluginsCb(    new HtmlWebPackPlugin({
    template: 'index.html',
    filename: path.join(__dirname, output, '/index.html')
  }), mode),
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
