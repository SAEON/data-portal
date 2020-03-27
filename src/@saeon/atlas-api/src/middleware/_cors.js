export default ((ALLOWED_ORIGINS) => {
  console.log('Allowed origins registered', ALLOWED_ORIGINS)
  return (req, res, next) => {
    const { method, headers } = req
    const { origin } = headers
    console.log(`Checking CORS policy`, `${origin}`, `${ALLOWED_ORIGINS.includes(origin)}`)
    if (ALLOWED_ORIGINS.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin)
    }
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    res.header('Access-Control-Allow-Credentials', true)
    if (method === 'OPTIONS') {
      res.sendStatus(200)
    } else {
      next()
    }
  }
})(
  process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',')
    : [
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:4000',
        'http://localhost:4001',
      ]
)
