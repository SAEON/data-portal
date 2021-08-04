import { PASSPORT_SSO_SESSION_ID } from '../../../../config.js'

export default async (self, args, ctx) => {
  const { input: logs, referrer = undefined } = args
  const { logToMongo } = ctx.mongo

  logToMongo(
    ...logs.map(log =>
      Object.assign(
        {
          referrer,
          clientSession: ctx.cookies.get(PASSPORT_SSO_SESSION_ID) || 'no-session', // This can happen if the user blocks cookies
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
