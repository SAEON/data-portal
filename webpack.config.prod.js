const path = require('path')

module.exports = {
  entry: './src/index.jsx',
  output: {
    filename: 'index.js',
    libraryTarget: 'commonjs'
  },
  resolve: {
    alias: {
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),
      'react-md': path.resolve('./node_modules/react-md')
    }
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'react-md': 'ReactMD'
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
          loader: "babel-loader"
        }
      },
      {
        test: /\.*css$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            fallback: "file-loader",
            name: "[name][md5:hash].[ext]",
            outputPath: 'assets/',
            publicPath: '/assets/'
          }
        }]
      }            
    ]
  }
}