import passport from 'koa-passport'
import { collections } from '../mongo/index.js'
import base64url from 'base64url'
import {
  HOSTNAME,
  ODP_AUTH,
  ODP_SSO_CLIENT_SECRET,
  ODP_SSO_CLIENT_ID,
  ODP_SSO_CLIENT_SCOPES,
  ODP_SSO_CLIENT_REDIRECT,
  ODP_AUTH_ODP_LOGOUT_REDIRECT,
  ODP_AUTH_WELL_KNOWN,
} from '../config/index.js'
import { Issuer, Strategy } from 'openid-client'

export default () => {
  /**
   * Allowing for the app to be started without
   * authentication makes it easier to setup deployments
   * and incrementally debug
   */
  if (!ODP_SSO_CLIENT_ID || !ODP_SSO_CLIENT_SECRET) {
    console.info('SAEON OAUTH credentials not provided. Skipping setup')
    return {
      authenticate: ctx => ctx.throw(401),
      login: ctx => ctx.throw(401),
    }
  } else {
    console.info('SAEON OAUTH authentication enabled')
  }

  /**
   * https://codeburst.io/how-to-implement-openid-authentication-with-openid-client-and-passport-in-node-js-43d020121e87
   *
   * This tutorial was helpful in getting openid-client
   * and passport to work together
   */
  Issuer.discover(ODP_AUTH_WELL_KNOWN).then(hydra => {
    const client = new hydra.Client({
      client_id: ODP_SSO_CLIENT_ID,
      client_secret: ODP_SSO_CLIENT_SECRET,
      redirect_uris: [ODP_SSO_CLIENT_REDIRECT],
      post_logout_redirect_uris: [ODP_AUTH_ODP_LOGOUT_REDIRECT],
      token_endpoint_auth_method: 'client_secret_post',
      response_types: ['code'],
    })

    passport.use(
      'oidc',
      new Strategy({ client }, async (tokenSet, userInfo, cb) => {
        const { email, sub: saeonId, name, picture } = userInfo
        const { Users, Roles } = await collections
        const saeonRoleId = (await Roles.find({ name: 'saeon' }).toArray())[0]._id
        const userRoleId = (await Roles.find({ name: 'user' }).toArray())[0]._id
        const emailAddress = email.toLowerCase()
        const isSaeon = emailAddress.match(/@saeon\.nrf\.ac\.za$/)

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
                authAddress: ODP_AUTH,
                saeonId,
                name,
                tokenSet,
              },
              $addToSet: {
                links: {
                  picture,
                },
              },
            },
            {
              upsert: true,
              returnDocument: 'after',
            }
          )
          const user = userQuery.value
          cb(null, { id: user._id, emailAddress: user.emailAddress, name: user.name })
        } catch (error) {
          console.error('Error authenticating', error.message)
          cb(error, null)
        }
      })
    )
  })

  passport.serializeUser((user, cb) => cb(null, user))
  passport.deserializeUser((user, cb) => cb(null, user))

  return {
    authenticate: async (ctx, next) => passport.authenticate('oidc')(ctx, next),

    /**
     * If /login is called without a 'redirect'
     * query param, then the result is 'undefined' as
     * a string, which needs to be parsed to be read
     * as undefined as a JavaScript value
     */
    login: async (ctx, next) =>
      passport.authenticate('oidc', {
        scope: ODP_SSO_CLIENT_SCOPES,
        state: base64url(
          JSON.stringify({
            redirect: ctx.request.query.redirect
              ? ctx.request.query.redirect == 'undefined'
                ? `${HOSTNAME}`
                : ctx.request.query.redirect
              : HOSTNAME,
          })
        ),
      })(ctx, next),
  }
}
