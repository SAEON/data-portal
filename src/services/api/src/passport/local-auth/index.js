import passport from 'koa-passport'
import LocalStrategy from 'passport-local'
import { collections } from '../../mongo/index.js'
import { compare } from 'bcrypt'

export default () => {
  passport.use(
    new LocalStrategy(async (username, password, cb) => {
      try {
        const { Users } = await collections
        const user = await Users.findOne({ username })
        const { passwordHash = '' } = user
        const success = await new Promise((resolve, reject) =>
          compare(password, passwordHash, (error, result) =>
            error ? reject(error) : resolve(result)
          )
        )

        if (success) {
          cb(null, user)
        } else {
          cb(null, false)
        }
      } catch (error) {
        cb(error, null)
      }
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
      const { successRedirect, failureRedirect } = ctx.request.body
      return passport.authenticate('local', {
        successRedirect: `${successRedirect}`,
        failureRedirect: `${failureRedirect}?error=${encodeURIComponent(
          'User already exists - please login with your existing credentials. You may also see this message if you previously authenticated via a 3rd party'
        )}`,
      })(ctx, next)
    },
  }
}
