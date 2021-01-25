import passport from 'koa-passport'
import LocalStrategy from 'passport-local'
import { collections } from '../../mongo/index.js'
import { compare } from 'bcrypt'

export default () => {
  passport.use(
    new LocalStrategy(async (username, password, cb) => {
      const { Users } = await collections
      const user = await Users.findOne({ email: username })
      const { passwordHash = '' } = user
      const success = await new Promise((resolve, reject) =>
        compare(password, passwordHash, (error, result) =>
          error ? reject(error) : resolve(result)
        )
      )

      if (success) {
        cb(null, user)
      } else {
        cb(new Error('Unknown email address or password'), null)
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
        successRedirect,
        failureRedirect,
      })(ctx, next)
    },
  }
}
