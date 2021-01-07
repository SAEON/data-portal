import { nanoid } from 'nanoid'
import { CATALOGUE_API_NODE_ENV, CATALOGUE_CLIENT_ID } from '../config.js'

export default async (ctx, next) => {
  if (!ctx.cookies.get(CATALOGUE_CLIENT_ID)) {
    ctx.cookies.set(
      CATALOGUE_CLIENT_ID,
      Buffer.from(
        JSON.stringify({
          date: new Date(),
          id: nanoid(),
        })
      ).toString('base64'),
      {
        signed: true,
        httpOnly: true,
        secure: CATALOGUE_API_NODE_ENV === 'development' ? false : true,
        sameSite: CATALOGUE_API_NODE_ENV === 'development' ? 'lax' : 'none',
      }
    )
  }

  await next()
}
