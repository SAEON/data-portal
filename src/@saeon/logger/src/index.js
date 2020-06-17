'use strict'
import format from 'date-fns/format'
;(typeof global !== 'undefined' ? global : self).globalThis =
  typeof globalThis !== 'undefined' ? globalThis : typeof global !== 'undefined' ? global : self

const _console = globalThis.console

var timestampFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"
const formatDate = () => format(new Date(), timestampFormat)

globalThis.console = {
  ..._console,
  log: (...args) => _console.log.call(_console, `${formatDate()} ${args[0]}`, ...args.slice(1)),
  info: (...args) => _console.info.call(_console, `${formatDate()} ${args[0]}`, ...args.slice(1)),
  warn: (...args) => _console.warn.call(_console, `${formatDate()} ${args[0]}`, ...args.slice(1)),
  error: (...args) => _console.error.call(_console, `${formatDate()} ${args[0]}`, ...args.slice(1)),
}

export const configure = async cb => {
  const { overwrites, formatter } = cb({ console: _console, timestampFormat })
  timestampFormat = formatter || timestampFormat
  globalThis.console = Object.assign(globalThis.console, overwrites)
}
