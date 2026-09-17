import passport from 'koa-passport'

export default async (ctx, next) => {
  return passport.authenticate('oidc', async (err, user, info) => {
    if (err || !user) {
      console.error('[OIDC CALLBACK] Auth failed:', err || info || 'No user returned')
      ctx.status = 401
      ctx.body = `Authentication failed: ${err?.message || info?.message || 'Unauthorized'}`
      return
    }

    try {
      await ctx.login(user)
      return next()
    } catch (loginErr) {
      console.error('[OIDC CALLBACK] ctx.login error:', loginErr)
      ctx.status = 500
      ctx.body = loginErr.message
    }
  })(ctx, next)
}
