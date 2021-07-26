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
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
  plugins: [['@babel/plugin-proposal-optional-chaining']],
}
