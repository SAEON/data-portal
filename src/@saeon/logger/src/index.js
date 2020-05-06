import format from 'date-fns/format'

const globalConsole = global.console
const overwrites = ['log', 'warn', 'info', 'error']
var proxyTarget = {}
var timestampFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"

;(global || window).console = new Proxy(proxyTarget, {
  get: (obj, prop) =>
    prop in obj
      ? obj[prop]
      : overwrites.includes(prop)
      ? (...args) =>
          globalConsole[prop].call(globalConsole, format(new Date(), timestampFormat), ...args)
      : globalConsole[prop],
})

/**
 * configure(({console, timestampFormat}) => ({
 *   overwrites: { log: () => console.log('new message) },
 *   formmater: timestampFormat // This uses the date-fns library
 * }))
 */
export const configure = async (cb) => {
  const { overwrites, formatter } = cb({ console: globalConsole, timestampFormat })
  proxyTarget = Object.assign(proxyTarget, overwrites)
  timestampFormat = formatter || timestampFormat
}
