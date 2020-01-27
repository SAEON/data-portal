const HtmlWebPackPlugin = require('html-webpack-plugin')
const path = require('path')

const outputConfig = mode =>
  mode === 'production'
    ? {
        filename: 'index.js',
        libraryTarget: 'commonjs'
      }
    : {
        filename: 'index.js'
      }

const resolveConfig = mode =>
  mode === 'production'
    ? {
        extensions: ['.js', '.jsx'],
        alias: {
          react: path.resolve('./node_modules/react'),
          'react-dom': path.resolve('./node_modules/react-dom')
        }
      }
    : {
        extensions: ['.js', '.jsx']
      }

const externalsConfig = mode =>
  mode === 'production'
    ? {
        react: 'react',
        'react-dom': 'react-dom',
        'react-md': 'react-md'
      }
    : {}

const pluginsConfig = mode =>
  mode === 'production'
    ? []
    : [
        new HtmlWebPackPlugin({
          template: './index.html',
          filename: './index.html'
        })
      ]

module.exports = ({ mode, entry, port }) => ({
  mode,
  entry: path.resolve(__dirname, entry),
  output: outputConfig(mode),
  resolve: resolveConfig(mode),
  externals: externalsConfig(mode),
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
  plugins: pluginsConfig(mode),
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: parseInt(port),
    historyApiFallback: true,
    compress: true,
    allowedHosts: ['.localhost'],
    headers: {
      'Access-Control-Allow-Headers': '*'
    }
  }
})
