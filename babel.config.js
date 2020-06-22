module.exports = {
  babelrcRoots: ['.', 'src/services/*', 'src/packages/*'],
  sourceType: 'unambiguous',
  presets: [
    [
      '@babel/preset-env',
      {
        debug: false,
        targets: {
          esmodules: true,
        },
      },
    ],
    ['@babel/preset-react'],
  ],
  plugins: [
    [
      'babel-plugin-transform-imports',
      {
        '@material-ui/core': {
          transform: '@material-ui/core/${member}',
          preventFullImport: true,
        },
        '@material-ui/icons': {
          transform: '@material-ui/icons/${member}',
          preventFullImport: true,
        },
        '@material-ui/lab': {
          transform: '@material-ui/lab/${member}',
          preventFullImport: true,
        },
      },
    ],
    ['@babel/plugin-proposal-optional-chaining'],
    ['@babel/plugin-proposal-class-properties'],
  ],
}
