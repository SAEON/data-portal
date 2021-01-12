import passport from 'koa-passport'
import { collections } from '../mongo/index.js'
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth'
import base64url from 'base64url'
import {
  CATALOGUE_API_GOOGLE_CLIENT_SECRET,
  CATALOGUE_API_GOOGLE_CLIENT_ID,
  CATALOGUE_API_OAUTH_REDIRECT_ADDRESS,
  CATALOGUE_API_NODE_ENV,
  CATALOGUE_API_ADDRESS,
} from '../config.js'

const hoursToMilliseconds = hrs => hrs * 60 * 60 * 1000

export default () => {
  if (CATALOGUE_API_GOOGLE_CLIENT_ID && CATALOGUE_API_GOOGLE_CLIENT_SECRET) {
    passport.use(
      new GoogleStrategy(
        {
          clientID: CATALOGUE_API_GOOGLE_CLIENT_ID,
          clientSecret: CATALOGUE_API_GOOGLE_CLIENT_SECRET,
          callbackURL: CATALOGUE_API_OAUTH_REDIRECT_ADDRESS,
        },
        async (accessToken, refreshToken, profile, cb) => {
          const { id: googleId, ..._profile } = profile
          const { Users, UserRoles } = await collections

          const datascientistRole = (await UserRoles.find({ name: 'datascientist' }).toArray())[0]

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
                      googleId,
                    },
                    $set: {
                      modifiedAt: new Date(),
                      email: _profile._json.email,
                      google: { accessToken, ..._profile },
                      userRoles: [datascientistRole._id],
                    },
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

    return {
      authenticate: passport.authenticate('google'),
      login: async (ctx, next) =>
        passport.authenticate('google', {
          scope: ['email'],
          state: base64url(
            JSON.stringify({ redirect: ctx.request.query.redirect || CATALOGUE_API_ADDRESS })
          ),
        })(ctx, next),
    }
  } else {
    console.info('Google API OAUTH credentials not provided. Skipping setup')
    return {
      authenticate: ctx => ctx.throw(401),
      login: ctx => ctx.throw(401),
    }
  }
}

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
