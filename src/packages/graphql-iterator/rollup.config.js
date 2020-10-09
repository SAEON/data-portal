import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default {
  external: ['@apollo/client'],
  input: ['src/index.js'],
  output: [
    {
      exports: "default",
      dir: 'dist',
      format: 'cjs',
      compact: true,
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    json({
      compact: true,
    }),
  ],
}
