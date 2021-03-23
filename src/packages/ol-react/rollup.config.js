import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import json from '@rollup/plugin-json'

export default {
  external: [/ol\//, 'react', 'react/jsx-runtime', /@babel\/runtime/],
  input: ['src/index.js'],
  output: [
    {
      dir: 'dist/cjs',
      format: 'cjs',
    },
    {
      dir: 'dist/esm',
      format: 'esm',
    },
  ],
  plugins: [
    commonjs(),
    babel({
      babelHelpers: 'runtime',
      exclude: 'node_modules/**',
      presets: [
        [
          '@babel/env',
          {
            debug: false,
            useBuiltIns: 'entry',
            corejs: { version: 3, proposals: true },
          },
        ],
        [
          '@babel/preset-react',
          {
            runtime: 'automatic',
          },
        ],
      ],
      plugins: [['@babel/plugin-transform-runtime'], ['@babel/plugin-proposal-class-properties']],
    }),
    json({
      compact: true,
    }),
  ],
}
