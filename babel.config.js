module.exports = {
  sourceType: 'unambiguous',
  presets: [['@babel/preset-env'], ['@babel/preset-react']],
  plugins: [
    [
      'babel-plugin-transform-imports',
      {
        'date-fns': {
          transform: (importName) => `date-fns/${importName}`,
          preventFullImport: true,
        },
        '@material-ui/core': {
          transform: '@material-ui/core/esm/${member}',
          preventFullImport: true,
        },
        '@material-ui/icons': {
          transform: '@material-ui/icons/esm/${member}',
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
