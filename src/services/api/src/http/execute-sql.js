import mongo from 'mongodb'
import QueryStream from 'pg-query-stream'
import JSONStream from 'JSONStream'

const { ObjectID } = mongo

export default async ctx => {
  await ctx.userModel.checkRole(ctx, 'datascientist')
  const { findDatabooks } = ctx.mongo.dataFinders
  const { databookId, sql } = ctx.request.body
  const databook = (await findDatabooks({ _id: ObjectID(databookId) }))[0]
  const { username, password: encryptedPassword } = databook.authentication
  const password = ctx.crypto.decrypt(encryptedPassword)
  const { createClient } = ctx.postgis

  const client = createClient({
    user: username,
    password,
  })

  client.connect()

  const query = new QueryStream(sql, [], {
    batchSize: 100,
  })

  const stream = client.query(query)
  stream.on('end', () => client.end())

  ctx.set('Content-type', 'application/json')
  ctx.body = stream.pipe(JSONStream.stringify())
}
