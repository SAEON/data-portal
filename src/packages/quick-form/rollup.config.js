import json from '@rollup/plugin-json'

export default {
  input: ['src/index.js'],
  output: [
    {
      exports: 'auto',
      dir: 'dist',
      format: 'cjs',
    },
  ],
  plugins: [
    json({
      compact: true,
    }),
  ],
}
