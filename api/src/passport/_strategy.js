import { collections } from '../mongo/index.js'
import { Strategy } from 'openid-client'
import {
  ODP_AUTH,
  ODP_SSO_CLIENT_SECRET,
  ODP_SSO_CLIENT_ID,
  ODP_SSO_CLIENT_REDIRECT,
  ODP_AUTH_LOGOUT_REDIRECT,
  PASSPORT_SSO_MAXAGE_HOURS,
} from '../config/index.js'
import { makeLog, logToMongo } from '../mongo/index.js'

export default hydra => {
  const client = new hydra.Client({
    client_id: ODP_SSO_CLIENT_ID,
    client_secret: ODP_SSO_CLIENT_SECRET,
    redirect_uris: [ODP_SSO_CLIENT_REDIRECT],
    post_logout_redirect_uris: [ODP_AUTH_LOGOUT_REDIRECT],
    token_endpoint_auth_method: 'client_secret_post',
    response_types: ['code'],
  })

  // Fallback: If userinfo endpoint 404s, catch error so strategy reads id_token claims
  const originalUserinfo = client.userinfo.bind(client)
  client.userinfo = async function (accessToken, options) {
    try {
      return await originalUserinfo(accessToken, options)
    } catch (error) {
      console.warn('[OIDC WARN] userinfo endpoint unavailable, falling back to token claims:', error.message)
      return {}
    }
  }

  return new Strategy(
    { client },
    async (tokenSet, userInfo, cb) => {
      const claims = tokenSet.claims() || {}
      const profile = { ...claims, ...userInfo }
      console.log('[OIDC LOG] Resolved user profile:', JSON.stringify(profile))

      const saeonId = profile?.sub || ''
      const name = profile?.name || profile?.preferred_username || saeonId || 'User'
      const picture = profile?.picture || ''
      const rawEmail =
        profile?.email ||
        profile?.upn ||
        profile?.preferred_username ||
        (saeonId.includes('@') ? saeonId : '') ||
        saeonId ||
        ''

      if (!rawEmail) {
        console.error('[OIDC LOG] No email/identifier found in claims or profile:', profile)
        return cb(new Error('OIDC provider did not return a user identifier'), null)
      }
      const { Users, Roles } = await collections
      const saeonRoleId = (await Roles.find({ name: 'saeon' }).toArray())[0]._id
      const userRoleId = (await Roles.find({ name: 'user' }).toArray())[0]._id
      const emailAddress = rawEmail.toLowerCase()
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

        // Log successful authentication
        logToMongo.load(
          makeLog(null, {
            type: 'authentication',
            userId: user._id,
            info: {
              userName: profile.name,
            },
          })
        )

        cb(null, { id: user._id, emailAddress: user.emailAddress, name: user.name })
      } catch (error) {
        console.error('Error authenticating', error.message)
        cb(error, null)
      }
    }
  )
}
