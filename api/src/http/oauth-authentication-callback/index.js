import passport from 'koa-passport'

export default async (ctx, next) => {
  console.log('[OIDC CALLBACK] Session state keys:', Object.keys(ctx.session || {}))
  console.log('[OIDC CALLBACK] OIDC session value:', ctx.session?.['oidc:protologue.saeon.ac.za'])

  return passport.authenticate('oidc', (err, user, info) => {
    if (err || !user) {
      console.error('[OIDC CALLBACK] Auth failed:', err || info || 'No user returned')
      ctx.status = 401
      ctx.body = `Authentication failed: ${err?.message || info?.message || 'Unauthorized'}`
      return
    }
    return ctx.login(user, err => {
      if (err) {
        ctx.status = 500
        ctx.body = err.message
        return
      }
      return next()
    })
  })(ctx, next)
}
