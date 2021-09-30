import { ObjectId } from 'mongodb'
import fetch from 'node-fetch'
import { ODP_API, ODP_INTEGRATION_BATCH_SIZE } from '../../../../config/index.js'

// TODO - this should be a single record only
export default async (self, { offset = 0, limit = ODP_INTEGRATION_BATCH_SIZE }, ctx) => {
  const { id: currentUserId } = ctx.user.info(ctx)
  const { findUsers } = ctx.mongo.dataFinders
  const user = (await findUsers({ _id: ObjectId(currentUserId) }))[0]
  const { token_type, access_token } = user.tokenSet

  const res = await fetch(`${ODP_API}/saeon/metadata?offset=${offset}&limit=${limit}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: [token_type, access_token].join(' '),
    },
  })

  const json = await res.json()
  return await json
}
