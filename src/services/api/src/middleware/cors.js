import { ALLOWED_ORIGINS } from '../config.js'

const handleCors = ALLOWED_ORIGINS => async (ctx, next) => {
  const { method, headers } = ctx.req
  const { origin } = headers
  console.log(`Checking CORS policy`, `${origin}`, `${ALLOWED_ORIGINS.includes(origin)}`)

  if (ALLOWED_ORIGINS.includes(origin)) {
    ctx.set('Access-Control-Allow-Origin', origin)
  }
  ctx.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  ctx.set(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, credentials, Authorization'
  )
  ctx.set('Access-Control-Allow-Credentials', true)
  if (method === 'OPTIONS') {
    ctx.status = 200
  } else {
    await next()
  }
}

export default (ALLOWED_ORIGINS => {
  console.log('CORS configured. Origins allowed:', ALLOWED_ORIGINS)
  return handleCors(ALLOWED_ORIGINS)
})(ALLOWED_ORIGINS)
