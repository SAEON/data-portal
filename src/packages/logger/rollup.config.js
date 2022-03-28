import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default {
  external: [/date-fns\//, '@apollo/client', /@babel\/runtime/],
  input: ['src/index.js', 'src/log-to-graphql.js', 'src/log-to-http.js'],
  output: [
    {
      exports: 'auto',
      dir: 'dist',
      format: 'esm',
      compact: true
    }
  ],
  plugins: [
    commonjs(),
    resolve(),
    json({
      compact: true
    })
  ]
}
