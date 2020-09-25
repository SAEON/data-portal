import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default {
  external: ['date-fns/format/index.js', '@apollo/client'],
  input: ['src/index.js', 'src/log-to-graphql.js', 'src/log-to-http.js'],
  output: [
    {
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
