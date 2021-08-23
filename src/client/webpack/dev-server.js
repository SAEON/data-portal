const path = require('path')
const fs = require('fs')

module.exports = (ROOT, output) => {
  const rewrites = fs
    .readdirSync(path.join(ROOT, 'src/entry-points'))
    .filter(name => fs.lstatSync(path.join(ROOT, `src/entry-points/${name}`)).isDirectory())
    .sort(name => (name === 'index' ? 1 : -1))
    .map(name => {
      if (name === 'index') {
        return { from: new RegExp('.'), to: '/index.html' }
      }

      return { from: new RegExp(`^${'\\'}/${name}`), to: `/${name}.html` }
    })

  return {
    static: {
      staticOptions: {
        contentBase: path.join(ROOT, output),
      }
    },
    historyApiFallback: {
      disableDotRule: true,
      rewrites,
    },
    compress: true,
  }
}
