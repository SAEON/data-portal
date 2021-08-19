import { ODP_LOGOUT_REDIRECT_ADDRESS } from '../config.js'
import { ObjectId } from 'mongodb'

export default async ctx => {
  const { user } = ctx
  const { findUsers } = ctx.mongo.dataFinders
  const token = (await findUsers({ _id: ObjectId(user.info(ctx).id) }))[0].mostRecentToken
  ctx.session = null
  ctx.redirect(
    `${ODP_LOGOUT_REDIRECT_ADDRESS}?id_token_hint=${token}&post_logout_redirect_uri=http://localhost:3000`
  )
}
