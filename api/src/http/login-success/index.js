import base64url from 'base64url'
import { HOSTNAME, PASSPORT_SSO_MAXAGE_HOURS } from '../../config/index.js'

export default async ctx => {
  const { state } = ctx.request.query
  const { redirect } = JSON.parse(base64url.decode(state))

  // Log successful authentication
  ctx.mongo.logToMongo(
    ctx.mongo.makeLog(ctx, {
      type: 'authentication',
      info: {
        maxAgeInHours: PASSPORT_SSO_MAXAGE_HOURS,
      },
    })
  )

  ctx.redirect(redirect || HOSTNAME)
}
