import { nanoid } from 'nanoid'
import { NODE_ENV, PASSPORT_SSO_SESSION_ID } from '../config.js'

export default async (ctx, next) => {
  if (!ctx.cookies.get(PASSPORT_SSO_SESSION_ID)) {
    ctx.cookies.set(
      PASSPORT_SSO_SESSION_ID,
      Buffer.from(
        JSON.stringify({
          date: new Date(),
          id: nanoid(),
        })
      ).toString('base64'),
      {
        signed: true,
        httpOnly: true,
        secure: NODE_ENV === 'development' ? false : true,
        sameSite: NODE_ENV === 'development' ? 'lax' : 'none',
      }
    )
  }

  await next()
}
