const path = require('path')

module.exports = (ROOT, output) => ({
  contentBase: path.join(ROOT, output),
  historyApiFallback: {
    disableDotRule: true,
    rewrites: [
      { from: /^\/atlas/, to: '/atlas.html' },
      { from: /^\/render/, to: '/render.html' },
      { from: /^\/collection/, to: '/collection.html' },
      { from: /./, to: '/index.html' },
    ],
  },
  compress: true,
})
