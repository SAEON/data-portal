import format from 'date-fns/format'

const _console = globalThis.console
var timestampFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"

const formatDate = () => format(new Date(), timestampFormat)

/**
 * Keep the same signature as the window.console object
 */
var proxyTarget = {
  ..._console,
  log: (...args) => _console.log.call(_console, formatDate(), ...args),
  info: (...args) => _console.info.call(_console, formatDate(), ...args),
  warn: (...args) => _console.warn.call(_console, formatDate(), ...args),
  error: (...args) => _console.error.call(_console, formatDate(), ...args),
}

globalThis.console = new Proxy(proxyTarget, {
  get: (obj, prop) => obj[prop]
})

export const configure = async (cb) => {
  const { overwrites, formatter } = cb({ console: _console, timestampFormat })
  proxyTarget = Object.assign(proxyTarget, overwrites)
  timestampFormat = formatter || timestampFormat
}
