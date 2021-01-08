import passport from 'koa-passport'
import { collections } from '../mongo/index.js'
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth'
import {
  CATALOGUE_API_GOOGLE_CLIENT_SECRET,
  CATALOGUE_API_GOOGLE_CLIENT_ID,
  CATALOGUE_API_NODE_ENV,
} from '../config.js'

const callbackURL = 'http://localhost:3000/authenticate/redirect'

export default () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: CATALOGUE_API_GOOGLE_CLIENT_ID,
        clientSecret: CATALOGUE_API_GOOGLE_CLIENT_SECRET,
        callbackURL,
      },
      async (accessToken, refreshToken, profile, cb) => {
        const { id: googleId, ..._profile } = profile
        const { Users } = await collections

        console.log(accessToken)
        console.log(refreshToken)
        try {
          cb(
            null,
            (
              await Users.findAndModify(
                {
                  googleId,
                },
                null,
                {
                  $setOnInsert: { google: _profile },
                  $set: { modifiedAt: new Date() },
                },
                {
                  new: true,
                  upsert: true,
                }
              )
            ).value
          )
        } catch (error) {
          cb(error, null)
        }
      }
    )
  )

  passport.serializeUser((user, cb) => {
    cb(null, user)
  })

  passport.deserializeUser((user, cb) => {
    cb(null, user)
  })
}

export const login = passport.authenticate('google')

export const authenticateUser = passport.authenticate('google', { scope: ['email'] })

export const passportCookieConfig = {
  key: 'koa.sess',
  maxAge: 86400000,
  autoCommit: true,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: true,
  renew: false,
  secure: CATALOGUE_API_NODE_ENV === 'development' ? false : true,
  sameSite: CATALOGUE_API_NODE_ENV === 'development' ? 'lax' : 'none',
}
