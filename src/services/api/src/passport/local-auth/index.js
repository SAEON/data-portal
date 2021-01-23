import passport from 'koa-passport'
import LocalStrategy from 'passport-local'

export default () => {
  passport.use(
    new LocalStrategy((username, password, cb) => {
      console.log('hi there')
      cb(null, {})
    })
  )

  passport.serializeUser((user, cb) => {
    cb(null, user)
  })

  passport.deserializeUser((user, cb) => {
    cb(null, user)
  })

  return {
    authenticate: async (ctx, next) => {
      console.log(ctx.request.body)
      return passport.authenticate('local', {
        successRedirect: 'http://localhost:3001',
        failureRedirect: 'http://localhost:3001/login',
      })(ctx, next)
    },
  }
}
