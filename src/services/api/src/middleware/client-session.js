import { nanoid } from 'nanoid'
import cookie from 'cookie'
import { NODE_ENV } from '../config.js'

//remove old dependencies
export default async (ctx, next) => {
  const { headers } = ctx.req

  //create session IFF
  ctx.res.setHeader(
    'set-cookie',
    [
      headers?.['set-cookie']?.map(c => c),
      cookie.serialize(
        'ClientSession',
        cookie.parse(ctx.req.headers.cookie || '').ClientSession ||
          Buffer.from(
            JSON.stringify({
              date: new Date(),
              id: nanoid(),
            })
          ).toString('base64'),
        {
          httpOnly: true,
          secure: NODE_ENV === 'development' ? false : true,
          sameSite: NODE_ENV === 'development' ? 'lax' : 'none',
        }
      ),
    ]
      .flat()
      .filter(_ => _)
  )

  await next()
}
