module.exports = {
  sourceType: 'unambiguous',
  presets: [['@babel/preset-env'], ['@babel/preset-react']],
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
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-class-properties',
    [
      '@babel/plugin-transform-runtime',
      { corejs: { version: 3, proposals: true }, regenerator: true },
    ],
  ],
}
