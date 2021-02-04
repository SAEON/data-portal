import mongo from 'mongodb'
import QueryStream from 'pg-query-stream'
import JSONStream from 'JSONStream'

const { ObjectID } = mongo

export default async ctx => {
  await ctx.user.ensureDataScientist(ctx)
  const { findDatabooks } = ctx.mongo.dataFinders
  const { databookId, sql } = ctx.request.body
  const databook = (await findDatabooks({ _id: ObjectID(databookId) }))[0]
  const { username, password: encryptedPassword } = databook.authentication
  const password = ctx.crypto.decrypt(encryptedPassword)
  const { createClient } = ctx.postgis

  /**
   * Configure the query
   */
  const query = new QueryStream(sql, [], {
    batchSize: 100,
  })

  /**
   * Configure the client
   */
  const client = createClient({
    user: username,
    password,
  })

  client.connect()

  /**
   * Configure the stream
   */
  const stream = client.query(query)
  stream
    .on('end', error => {
      client.end(() => {
        if (error) {
          console.error(new Error(error.message))
        }
      })
    })
    .on('error', error => {
      ctx.body.write(`ERROR ${error.message}`)
      stream.destroy()
      stream.emit('end', error)
    })

  /**
   * Configure the response
   */
  ctx.set('Content-type', 'text/plain')
  ctx.body = stream.pipe(JSONStream.stringify())
}
