import passport from 'koa-passport'
import { collections } from '../../mongo/index.js'
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth'
import base64url from 'base64url'
import {
  CATALOGUE_API_GOOGLE_CLIENT_SECRET,
  CATALOGUE_API_GOOGLE_CLIENT_ID,
  CATALOGUE_API_GOOGLE_OAUTH_REDIRECT_ADDRESS,
  CATALOGUE_API_ADDRESS,
} from '../../config.js'

export default () => {
  if (CATALOGUE_API_GOOGLE_CLIENT_ID && CATALOGUE_API_GOOGLE_CLIENT_SECRET) {
    passport.use(
      new GoogleStrategy(
        {
          clientID: CATALOGUE_API_GOOGLE_CLIENT_ID,
          clientSecret: CATALOGUE_API_GOOGLE_CLIENT_SECRET,
          callbackURL: CATALOGUE_API_GOOGLE_OAUTH_REDIRECT_ADDRESS,
        },
        async (accessToken, refreshToken, profile, cb) => {
          const { Users, UserRoles } = await collections
          const datascientistRoleId = (await UserRoles.find({ name: 'datascientist' }).toArray())[0]
            ._id

          const { _json: googleProfile } = profile

          try {
            cb(
              null,
              (
                await Users.findAndModify(
                  {
                    username: googleProfile.email,
                  },
                  null,
                  {
                    $setOnInsert: {
                      username: googleProfile.email,
                    },
                    $set: {
                      google: Object.assign({ accessToken, modifiedAt: new Date() }, googleProfile),
                    },
                    $addToSet: {
                      userRoles: googleProfile.hd === 'saeon.ac.za' ? datascientistRoleId : '',
                      emails: {
                        email: googleProfile.email,
                        verified: googleProfile.email_verified,
                      },
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
      login: async (ctx, next) => {
        /**
         * If /login/google is called without a 'redirect'
         * query param, then the result is 'undefined' as
         * a string
         */
        const redirect = ctx.request.query.redirect
          ? ctx.request.query.redirect == 'undefined'
            ? CATALOGUE_API_ADDRESS
            : ctx.request.query.redirect
          : CATALOGUE_API_ADDRESS

        return passport.authenticate('google', {
          scope: ['email'],
          prompt: 'select_account',
          state: base64url(JSON.stringify({ redirect })),
        })(ctx, next)
      },
    }
  } else {
    console.info('Google API OAUTH credentials not provided. Skipping setup')
    return {
      authenticate: ctx => ctx.throw(401),
      login: ctx => ctx.throw(401),
    }
  }
}
