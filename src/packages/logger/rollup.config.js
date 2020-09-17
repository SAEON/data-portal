import json from '@rollup/plugin-json'

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
    json({
      compact: true,
    }),
  ],
}
