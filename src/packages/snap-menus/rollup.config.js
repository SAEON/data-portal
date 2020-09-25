import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import json from '@rollup/plugin-json'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'

export default {
  input: ['src/index.js', 'src/provider.jsx'],
  output: [
    {
      exports: 'auto',
      dir: 'dist',
      format: 'cjs',
    },
  ],
  plugins: [
    nodeResolve(),
    postcss({
      plugins: [],
    }),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      presets: [
        [
          '@babel/env',
          {
            debug: false,
            modules: false,
            targets: {
              esmodules: true,
            },
          },
        ],
        ['@babel/preset-react'],
      ],
    }),
    commonjs(),
    json({
      compact: true,
    }),
  ],
}
