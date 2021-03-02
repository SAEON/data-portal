import json from '@rollup/plugin-json'

export default {
  external: ['react'],
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
