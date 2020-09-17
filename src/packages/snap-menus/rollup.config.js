import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import json from '@rollup/plugin-json'

export default {
  input: ['src/index.js', 'src/provider.jsx'],
  output: [
    {
      // exports: 'auto',
      dir: 'dist',
      format: 'cjs',
    },
  ],
  plugins: [
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
    }),
    commonjs(),
    json({
      compact: true,
    }),
  ],
}
