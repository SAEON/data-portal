import { nanoid } from 'nanoid'
import { DEPLOY_ENV } from '../config.js'

export default async (ctx, next) => {
  if (!ctx.cookies.get('ClientSession')) {
    ctx.cookies.set(
      'ClientSession',
      Buffer.from(
        JSON.stringify({
          date: new Date(),
          id: nanoid(),
        })
      ).toString('base64'),
      {
        httpOnly: true,
        secure: DEPLOY_ENV === 'development' ? false : true,
        sameSite: DEPLOY_ENV === 'development' ? 'lax' : 'none',
      }
    )
  }

  await next()
}
