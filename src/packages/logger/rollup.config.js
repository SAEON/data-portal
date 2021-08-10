import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { babel } from '@rollup/plugin-babel'

export default {
  external: [/date-fns\//, '@apollo/client', /@babel\/runtime/],
  input: ['src/index.js', 'src/log-to-graphql.js', 'src/log-to-http.js'],
  output: [
    {
      exports: 'auto',
      dir: 'dist',
      format: 'esm',
      compact: true,
    },
  ],
  plugins: [
    commonjs(),
    resolve(),
    // babel({
    //   babelHelpers: 'runtime',
    //   presets: [
    //     [
    //       '@babel/preset-env',
    //       {
    //         debug: false,
    //         useBuiltIns: 'entry',
    //         corejs: { version: 3, proposals: true },
    //       },
    //     ],
    //   ],
    //   plugins: [['@babel/plugin-transform-runtime']],
    // }),

    json({
      compact: true,
    }),
  ],
}
