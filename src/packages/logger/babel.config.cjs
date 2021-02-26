module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        debug: false,
        useBuiltIns: 'entry',
        corejs: { version: 3, proposals: true },
      },
    ],
  ],
  plugins: [['@babel/plugin-transform-runtime']],
}
