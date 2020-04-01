export default (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch((error) => {
    console.error('Error caught in the async handler', error)
    return next()
  })
