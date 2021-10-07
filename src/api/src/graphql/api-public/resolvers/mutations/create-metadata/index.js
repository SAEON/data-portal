import { ObjectId } from 'mongodb'
import fetch from 'node-fetch'
import { ODP_API } from '../../../../../config/index.js'

export default async (self, { input }, ctx) => {
  const { id: currentUserId } = ctx.user.info(ctx)
  const { findUsers } = ctx.mongo.dataFinders
  const user = (await findUsers({ _id: ObjectId(currentUserId) }))[0]
  const { token_type, access_token } = user.tokenSet
  const authorization = [token_type, access_token].join(' ')

  const res = await fetch(`${ODP_API}/saeon/metadata`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      accept: 'application/json',
      authorization,
    },
    body: JSON.stringify({
      sid: 'asdfasd99923e4sfasdfad',
      collection_key: 'string',
      schema_key: 'string',
      metadata: {},
    }),
  })

  return []
}
