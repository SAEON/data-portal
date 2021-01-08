import passport from 'koa-passport'
import { collections } from '../mongo/index.js'
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth'
import {
  CATALOGUE_API_GOOGLE_CLIENT_SECRET,
  CATALOGUE_API_GOOGLE_CLIENT_ID,
  CATALOGUE_API_NODE_ENV,
} from '../config.js'

const callbackURL = 'http://localhost:3000/authenticate/redirect'

const hoursToMilliseconds = hrs => hrs * 60 * 60 * 1000

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
                  $setOnInsert: {
                    email: _profile._json.email,
                    google: { accessToken, ..._profile },
                  },
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

export const authenticate = passport.authenticate('google')

export const login = passport.authenticate('google', { scope: ['email'] })

export const passportCookieConfig = {
  key: 'koa.sess',
  maxAge: hoursToMilliseconds(12),
  autoCommit: true,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: true,
  renew: false,
  secure: CATALOGUE_API_NODE_ENV === 'development' ? false : true,
  sameSite: CATALOGUE_API_NODE_ENV === 'development' ? 'lax' : 'none',
}
