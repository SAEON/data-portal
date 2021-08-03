import passport from 'koa-passport'
import fetch from 'node-fetch'
import { collections } from '../mongo/index.js'
import { OAuth2Strategy } from 'passport-oauth'
import base64url from 'base64url'
import {
  HOSTNAME,
  CATALOGUE_API_ODP_USER_AUTH_CLIENT_SECRET,
  CATALOGUE_API_ODP_USER_AUTH_CLIENT_ID,
  CATALOGUE_API_ODP_USER_AUTH_CLIENT_SCOPES,
  CATALOGUE_API_ODP_USER_AUTH_CLIENT_REDIRECT_ADDRESS,
  SAEON_AUTH_ADDRESS,
} from '../config.js'

export default () => {
  if (!CATALOGUE_API_ODP_USER_AUTH_CLIENT_ID || !CATALOGUE_API_ODP_USER_AUTH_CLIENT_SECRET) {
    console.info('SAEON OAUTH credentials not provided. Skipping setup')
    return {
      authenticate: ctx => ctx.throw(401),
      login: ctx => ctx.throw(401),
    }
  }

  console.info('SAEON OAUTH authentication enabled')

  passport.use(
    'provider',
    new OAuth2Strategy(
      {
        tokenURL: `${SAEON_AUTH_ADDRESS}/oauth2/token`,
        authorizationURL: `${SAEON_AUTH_ADDRESS}/oauth2/auth`,
        clientID: CATALOGUE_API_ODP_USER_AUTH_CLIENT_ID,
        clientSecret: CATALOGUE_API_ODP_USER_AUTH_CLIENT_SECRET,
        callbackURL: CATALOGUE_API_ODP_USER_AUTH_CLIENT_REDIRECT_ADDRESS,
      },
      async (token, tokenSecret, _, cb) => {
        const { Users, UserRoles } = await collections
        const {
          email,
          sub: saeonId,
          name,
          picture,
        } = await fetch(`${SAEON_AUTH_ADDRESS}/userinfo`, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }).then(res => res.json())

        const datascientistRoleId = (await UserRoles.find({ name: 'datascientist' }).toArray())[0]
          ._id

        const emailAddress = email.toLowerCase()

        try {
          const user = await Users.findOneAndUpdate(
            {
              emailAddress,
            },
            {
              $setOnInsert: {
                emailAddress,
              },
              $set: {
                saeonId,
                name,
              },
              $addToSet: {
                userRoles: emailAddress.match(/@saeon\.ac\.za$/) ? datascientistRoleId : '',
                links: {
                  picture,
                },
              },
            },
            {
              returnOriginal: false,
              upsert: true,
            }
          )
          cb(null, user.value)
        } catch (error) {
          console.error('Error authenticating', error.message)
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
    authenticate: async (ctx, next) => passport.authenticate('provider')(ctx, next),
    login: async (ctx, next) => {
      /**
       * If /login is called without a 'redirect'
       * query param, then the result is 'undefined' as
       * a string
       */
      const redirect = ctx.request.query.redirect
        ? ctx.request.query.redirect == 'undefined'
          ? `${HOSTNAME}`
          : ctx.request.query.redirect
        : HOSTNAME

      return passport.authenticate('provider', {
        scope: CATALOGUE_API_ODP_USER_AUTH_CLIENT_SCOPES.split(','),
        state: base64url(JSON.stringify({ redirect })),
      })(ctx, next)
    },
  }
}
