import JSONStream from 'JSONStream'

export default async ctx => {
  const { databookId: schema } = ctx.params
  const { sql } = ctx.request.body
  const { publicQuery } = ctx.postgis

  try {
    /**
     * Allow for long connection
     */
    ctx.request.socket.setTimeout(20 * 60 * 1000) // 20 min

    /**
     * Configure query stream
     */
    const { stream, client } = await publicQuery({
      text: sql,
      onEnd: error => {
        client.end(() => {
          if (error) {
            console.error('(ignore - this is a client-user error)', new Error(error.message))
          }
        })
        client.release()
      },
      onError: error => {
        ctx.body.write(`ERROR ${error.message}`)
        stream.destroy()
        stream.emit('end', error)
      },
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
