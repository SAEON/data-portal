import json from '@rollup/plugin-json'

export default {
  external: ['react'],
  input: ['src/index.js'],
  output: [
    {
      dir: 'dist/cjs',
      format: 'cjs',
      exports: "default"
    },
    {
      dir: 'dist/esm',
      format: 'esm',
    },
  ],
  plugins: [
    json({
      compact: true,
    }),
  ],
}
