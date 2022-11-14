import { ODP_AUTH_LOGOUT_REDIRECT, HOSTNAME, API_ADDRESS } from '../../config/index.js'
import { ObjectId } from 'mongodb'

export default async ctx => {
  /**
   * User is already logged out
   */
  if (ctx.session.isNew) {
    return ctx.redirect(HOSTNAME)
  }

  /**
   * Otherwise log user out of Oauth2 server
   */
  const { user } = ctx
  const { findUsers } = ctx.mongo.dataFinders

  ctx.session = null

  const id_token =
    (await findUsers({ _id: ObjectId(user.info(ctx).id) }))[0]?.tokenSet?.id_token || null

  return ctx.redirect(
    `${ODP_AUTH_LOGOUT_REDIRECT}?id_token_hint=${id_token}&post_logout_redirect_uri=${API_ADDRESS}/logout`
  )
}
