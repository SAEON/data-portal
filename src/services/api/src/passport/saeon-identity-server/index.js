import passport from 'koa-passport'
import fetch from 'node-fetch'
import { collections } from '../../mongo/index.js'
import { OAuth2Strategy } from 'passport-oauth'
import base64url from 'base64url'
import {
  CATALOGUE_API_ODP_USER_AUTH_CLIENT_SECRET,
  CATALOGUE_API_ODP_USER_AUTH_CLIENT_ID,
  CATALOGUE_API_ODP_USER_AUTH_CLIENT_REDIRECT_ADDRESS,
  CATALOGUE_API_ADDRESS,
  CATALOGUE_API_ODP_USER_AUTH_CLIENT_SCOPES,
  CATALOGUE_API_ODP_AUTH_ADDRESS,
} from '../../config.js'

export default () => {
  if (CATALOGUE_API_ODP_USER_AUTH_CLIENT_ID && CATALOGUE_API_ODP_USER_AUTH_CLIENT_SECRET) {
    passport.use(
      'provider',
      new OAuth2Strategy(
        {
          tokenURL: `${CATALOGUE_API_ODP_AUTH_ADDRESS}/oauth2/token`,
          authorizationURL: `${CATALOGUE_API_ODP_AUTH_ADDRESS}/oauth2/auth`,
          clientID: CATALOGUE_API_ODP_USER_AUTH_CLIENT_ID,
          clientSecret: CATALOGUE_API_ODP_USER_AUTH_CLIENT_SECRET,
          callbackURL: CATALOGUE_API_ODP_USER_AUTH_CLIENT_REDIRECT_ADDRESS,
        },
        async (token, tokenSecret, _, cb) => {
          // eslint-disable-next-line
          const { Users } = await collections

          /**
           * Fetch the user info
           *
           * TODO
           * This needs to be implemented with the .ac.za identity server
           */
          const profile = await fetch(`${CATALOGUE_API_ODP_AUTH_ADDRESS}/userinfo`).then(res =>
            res.text()
          )

          try {
            cb(null, {})
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
      authenticate: async (ctx, next) => {
        return passport.authenticate('provider')(ctx, next)
      },
      login: async (ctx, next) => {
        return passport.authenticate('provider', {
          scope: CATALOGUE_API_ODP_USER_AUTH_CLIENT_SCOPES.split(','),
          state: base64url(
            JSON.stringify({ redirect: ctx.request.query.redirect || CATALOGUE_API_ADDRESS })
          ),
        })(ctx, next)
      },
    }
  } else {
    console.info('SAEON API OAUTH credentials not provided. Skipping setup')
    return {
      authenticate: ctx => ctx.throw(401),
      login: ctx => ctx.throw(401),
    }
  }
}
