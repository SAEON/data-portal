export function ExpiredException(message) {
  const error = new Error(message)
  error.code = 'EXPIRED'
  return error
}

ExpiredException.prototype = Object.create(Error.prototype)
