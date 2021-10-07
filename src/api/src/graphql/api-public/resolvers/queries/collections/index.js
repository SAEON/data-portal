import { ObjectId } from 'mongodb'
import fetch from 'node-fetch'
import { ODP_API } from '../../../../../config/index.js'

export default async (self, { institution }, ctx) => {
  const { id: currentUserId } = ctx.user.info(ctx)
  const { findUsers } = ctx.mongo.dataFinders
  const user = (await findUsers({ _id: ObjectId(currentUserId) }))[0]
  const { token_type, access_token } = user.tokenSet
  const authorization = [token_type, access_token].join(' ')

  const res = await fetch(`${ODP_API}/${institution}/collection`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
    },
  })

  return await res.json()
}
