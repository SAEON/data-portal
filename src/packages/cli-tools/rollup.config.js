import json from '@rollup/plugin-json'
import commonjs from '@rollup/plugin-commonjs'

export default {
  input: 'src/index.js',
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
    json({
      compact: true,
    }),
  ],
}
