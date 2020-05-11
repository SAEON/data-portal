import format from 'date-fns/format'

// eslint-disable-next-line no-global-assign
globalThis = window || global
const _console = globalThis.console

var timestampFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"
const formatDate = () => format(new Date(), timestampFormat)

globalThis.console = {
  ..._console,
  log: (...args) => _console.log.call(_console, formatDate(), ...args),
  info: (...args) => _console.info.call(_console, formatDate(), ...args),
  warn: (...args) => _console.warn.call(_console, formatDate(), ...args),
  error: (...args) => _console.error.call(_console, formatDate(), ...args),
}

export const configure = async (cb) => {
  const { overwrites, formatter } = cb({ console: _console, timestampFormat })
  timestampFormat = formatter || timestampFormat
  globalThis.console = Object.assign(globalThis.console, overwrites)
}
