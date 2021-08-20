import { ODP_LOGOUT_REDIRECT_ADDRESS, HOSTNAME, API_PUBLIC_ADDRESS } from '../config.js'
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
  const id_token = (await findUsers({ _id: ObjectId(user.info(ctx).id) }))[0].id_token
  ctx.session = null
  return ctx.redirect(
    `${ODP_LOGOUT_REDIRECT_ADDRESS}?id_token_hint=${id_token}&post_logout_redirect_uri=${API_PUBLIC_ADDRESS}/logout`
  )
}
