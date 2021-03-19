const HtmlWebPackPlugin = require('html-webpack-plugin')
const path = require('path')


module.exports = ({production}) => {
  const output = 'dist'
  const mode = production ? 'production' : 'development'

  return {
    devtool: false,
    target: mode === 'production' ? ['web', 'es5'] : 'web',
    mode,
    entry: {
      index: './src/index.jsx',
    },
    output: {
      filename: '[name].[contenthash].js',
      chunkFilename: '[name].[contenthash].js',
      path: path.join(__dirname, output),
      publicPath: '/',
      assetModuleFilename: 'assets/[hash][ext][query]',
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      alias: {
        // OpenLayers
        'ol/control': path.resolve(__dirname, './node_modules/ol/control'),
        'ol/format': path.resolve(__dirname, './node_modules/ol/format'),
        'ol/layer/Group': path.resolve(__dirname, './node_modules/ol/layer/Group'),
        'ol/View': path.resolve(__dirname, './node_modules/ol/View'),
        'ol/Map': path.resolve(__dirname, './node_modules/ol/Map'),

        // clsx
        clsx: path.resolve(__dirname, './node_modules/clsx'),

        // React
        react: path.resolve(__dirname, './node_modules/react'),
        'react-dom': path.resolve(__dirname, './node_modules/react-dom'),

        // @saeon/quick-form
        '@saeon/quick-form': path.resolve(
          __dirname,
          mode === 'production' ? './node_modules/@saeon/quick-form' : '../../packages/quick-form'
        ),

        // @saeon/snap-menus
        '@saeon/snap-menus': path.resolve(
          __dirname,
          mode === 'production' ? './node_modules/@saeon/snap-menus' : '../../packages/snap-menus'
        ),

        // @saeon/ol-react
        '@saeon/ol-react': path.resolve(
          __dirname,
          mode === 'production' ? './node_modules/@saeon/ol-react' : '../../packages/ol-react/dist/esm'
        ),

        // @saeon/logger
        '@saeon/logger': path.resolve(
          __dirname,
          mode === 'production' ? './node_modules/@saeon/logger' : '../../packages/logger'
        ),
      },
    },
    optimization: {
      minimize: false,
      splitChunks: { chunks: 'all' },
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: mode === 'production' ? /@babel(?:\/|\\{1,2})runtime|core-js/ : /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              envName: mode,
            },
          },
        },
        {
          test: /\.*css$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /\.(woff|woff2|eot|ttf)$/,
          type: 'asset/resource',
        },
        {
          test: /\.svg$/,
          use: ['@svgr/webpack'],
        },
        {
          test: /\.(png|jpg|gif)$/,
          type: 'asset/inline',
        },
      ],
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: 'index.html',
        filename: path.join(__dirname, output, 'index.html'),
      }),
    ],
    devServer: {
      contentBase: path.join(__dirname, output),
      historyApiFallback: {
        disableDotRule: true,
      },
      compress: true,
    },
  }
}
