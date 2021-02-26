import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { babel } from '@rollup/plugin-babel'

export default {
  external: ['date-fns/format/index.js', '@apollo/client', /@babel\/runtime/],
  input: ['src/index.js', 'src/log-to-graphql.js', 'src/log-to-http.js'],
  output: [
    {
      dir: 'dist',
      format: 'esm',
      compact: true,
    },
  ],
  plugins: [
    babel({ babelHelpers: 'runtime' }),
    resolve(),
    commonjs(),
    json({
      compact: true,
    }),
  ],
}
