import { CATALOGUE_CLIENT_ID } from '../../../../config.js'

export default async (self, args, ctx) => {
  const { input: logs } = args
  const { logToMongo } = ctx.mongo

  logToMongo(
    ...logs.map(log =>
      Object.assign(
        {
          clientSession: ctx.cookies.get(CATALOGUE_CLIENT_ID),
          clientInfo: {
            ipAddress: ctx.request.headers['X-Real-IP'] || ctx.request.ip,
            userAgent: ctx.request.headers['user-agent'],
          },
        },
        log
      )
    )
  )
}
