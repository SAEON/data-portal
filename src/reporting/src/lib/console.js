import format from 'date-fns/format'

// Only these functions are shadowed by default
const overwrites = ['log', 'warn', 'info', 'error']

export default new Proxy(
  // Proxy (overwrite console methods here)
  {},

  // Handler
  {
    get: (obj, prop) =>
      prop in obj
        ? obj[prop]
        : overwrites.includes(prop)
        ? (...args) =>
            console[prop].call(console, format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"), ...args)
        : console[prop],
  }
)
