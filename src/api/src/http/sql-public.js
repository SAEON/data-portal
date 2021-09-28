import { ObjectId } from 'mongodb'
import QueryStream from 'pg-query-stream'
import JSONStream from 'JSONStream'

export default async ctx => {
  const { findDatabooks } = ctx.mongo.dataFinders
  const { databookId } = ctx.params
  const { sql } = ctx.request.body

  try {
    /**
     * Get databook
     */
    const databook = (await findDatabooks({ _id: ObjectId(databookId) }))[0]
    const { username, password: encryptedPassword } = databook.authentication.public || {}
    if (!username || !encryptedPassword) throw new Error('Public endpoint not configured')
    const password = ctx.crypto.decrypt(encryptedPassword)

    /**
     * Allow for long connection
     */
    ctx.request.socket.setTimeout(20 * 60 * 1000) // 20 min

    /**
     * Configure postgres query
     */
    const { createClient } = ctx.postgis
    const query = new QueryStream(sql, [], {
      batchSize: 100,
    })
    const client = createClient({
      user: username,
      password,
    })
    client.connect()

    /**
     * Configure query stream
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
  } catch (error) {
    console.error(error)
    ctx.throw(400)
  }
}
