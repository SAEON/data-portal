import { nanoid } from 'nanoid'
import { NODE_ENV } from '../config.js'

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
        secure: false, // NODE_ENV === 'development' ? false : true, // TODO https://github.com/pillarjs/cookies/issues/51
        sameSite: NODE_ENV === 'development' ? 'lax' : 'none',
      }
    )
  }

  await next()
}
