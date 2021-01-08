import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default {
  input: ['src/index.js'],
  output: [
    {
      exports: 'auto',
      dir: 'dist',
      format: 'esm',
    },
  ],
  plugins: [
    resolve({
      preferBuiltins: false,
    }),
    commonjs(),
    json({
      compact: true,
    }),
  ],
}
