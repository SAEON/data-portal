import format from 'date-fns/format'

const globalConsole = globalThis.console
const overwrites = ['log', 'warn', 'info', 'error']
var timestampFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"

var proxyTarget = {
  ...globalConsole,
  log: undefined,
  info: undefined,
  warn: undefined,
  error: undefined,
}

globalThis.console = new Proxy(proxyTarget, {
  get: (obj, prop) =>
    obj[prop] !== undefined
      ? obj[prop]
      : overwrites.includes(prop)
      ? (...args) =>
          globalConsole[prop].call(globalConsole, format(new Date(), timestampFormat), ...args)
      : undefined,
})

export const configure = async (cb) => {
  const { overwrites, formatter } = cb({ console: globalConsole, timestampFormat })
  proxyTarget = Object.assign(proxyTarget, overwrites)
  timestampFormat = formatter || timestampFormat
}
