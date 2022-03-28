import json from '@rollup/plugin-json'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default {
  input: 'src/index.js',
  output: [
    {
      dir: 'dist/cjs',
      format: 'cjs',
      exports: 'named'
    },
    {
      dir: 'dist/esm',
      format: 'esm',
      exports: 'named'
    }
  ],
  plugins: [
    nodeResolve({
      preferBuiltins: true
    }),
    commonjs(),
    json({
      compact: true
    })
  ]
}
