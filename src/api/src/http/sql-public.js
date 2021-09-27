import { ObjectId } from 'mongodb'
import QueryStream from 'pg-query-stream'
import JSONStream from 'JSONStream'

export default async ctx => {
  const { findDatabooks } = ctx.mongo.dataFinders
  const { databookId, sql } = ctx.request.body
  const databook = (await findDatabooks({ _id: ObjectId(databookId) }))[0]
  const { username, password: encryptedPassword } = databook.authentication
  const password = ctx.crypto.decrypt(encryptedPassword)
  const { createClient } = ctx.postgis

  // set timeout to 20 minutes
  ctx.request.socket.setTimeout(20 * 60 * 1000)

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
          console.error('(ignore - this is a client-user error)', new Error(error.message))
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
