import passport from 'koa-passport'
import fetch from 'node-fetch'
import { collections } from '../mongo/index.js'
import { OAuth2Strategy } from 'passport-oauth'
import base64url from 'base64url'
import {
  HOSTNAME,
  ODP_SSO_CLIENT_SECRET,
  ODP_SSO_CLIENT_ID,
  ODP_SSO_CLIENT_SCOPES,
  ODP_SSO_CLIENT_REDIRECT,
  ODP_AUTH_ADDRESS,
} from '../config.js'

export default () => {
  if (!ODP_SSO_CLIENT_ID || !ODP_SSO_CLIENT_SECRET) {
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
        tokenURL: `${ODP_AUTH_ADDRESS}/oauth2/token`,
        authorizationURL: `${ODP_AUTH_ADDRESS}/oauth2/auth`,
        clientID: ODP_SSO_CLIENT_ID,
        clientSecret: ODP_SSO_CLIENT_SECRET,
        callbackURL: ODP_SSO_CLIENT_REDIRECT,
      },
      async (token, tokenSecret, _, cb) => {
        const { Users, Roles } = await collections
        const {
          email,
          sub: saeonId,
          name,
          picture,
        } = await fetch(`${ODP_AUTH_ADDRESS}/userinfo`, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }).then(res => res.json())

        const saeonRoleId = (await Roles.find({ name: 'saeon' }).toArray())[0]._id
        const userRoleId = (await Roles.find({ name: 'user' }).toArray())[0]._id

        const emailAddress = email.toLowerCase()
        const isSaeon = emailAddress.match(/@saeon\.ac\.za$/)

        try {
          const userQuery = await Users.findOneAndUpdate(
            {
              emailAddress,
            },
            {
              $setOnInsert: {
                emailAddress,
                roles: [isSaeon ? saeonRoleId : userRoleId],
              },
              $set: {
                saeonId,
                name,
              },
              $addToSet: {
                links: {
                  picture,
                },
              },
            },
            {
              upsert: true,
              returnOriginal: false,
            }
          )

          const user =
            userQuery.value || (await Users.findOne({ _id: userQuery.lastErrorObject.upserted }))
          cb(null, { id: user._id, emailAddress: user.emailAddress, name: user.name })
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
        scope: ODP_SSO_CLIENT_SCOPES.split(','),
        state: base64url(JSON.stringify({ redirect })),
      })(ctx, next)
    },
  }
}
