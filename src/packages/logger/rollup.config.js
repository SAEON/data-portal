import json from '@rollup/plugin-json'
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: ['src/index.js', 'src/log-to-graphql.js', 'src/log-to-http.js'],
  output: [
    {
      exports: 'auto',
      dir: 'dist',
      format: 'cjs',
    },
  ],
  plugins: [
    nodeResolve({
      preferBuiltins: true,
    }),
    json({
      compact: true,
    }),
  ],
}
