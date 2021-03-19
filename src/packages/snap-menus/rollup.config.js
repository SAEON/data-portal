import commonjs from '@rollup/plugin-commonjs'
import { babel } from '@rollup/plugin-babel'
import json from '@rollup/plugin-json'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'

export default {
  external: [/@material-ui\//, 'react', 'react-dom', 'react/jsx-runtime', 'clsx', /@babel\/runtime/],
  input: ['src/index.js', 'src/provider.jsx'],
  output: [
    {
      dir: 'dist/cjs',
      format: 'cjs',
      exports: "auto"
    },
    {
      dir: 'dist/esm',
      format: 'esm',
    },
  ],
  plugins: [
    nodeResolve(),
    postcss({
      plugins: [],
    }),
    commonjs(),
    babel({
      babelHelpers: 'runtime',
      presets: [
        [
          '@babel/preset-env',
          {
            debug: false,
            useBuiltIns: 'entry',
            corejs: { version: 3, proposals: true },
          },
        ],
        ['@babel/preset-react', {
          "runtime": "automatic"
        }],
      ],
      plugins: [['@babel/plugin-transform-runtime']],
    }),
    json({
      compact: true,
    }),
  ],
}
