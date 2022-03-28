import hash from 'object-hash'
import { packageJson } from '../../../config/index.js'
import { PASSPORT_SSO_SESSION_ID } from '../../../config/index.js'

export default async (_, args, ctx, info) => {
  const referrer = args?.referrer || undefined
  const clientSession = ctx?.cookies.get(PASSPORT_SSO_SESSION_ID) || 'no-session' // This can happen if the user blocks cookies or if the API is used programmatically
  const { operation, fragments, variableValues } = info
  const { logToMongo } = ctx.mongo

  const query = {
    operation: JSON.stringify(operation),
    fragments: JSON.stringify(fragments),
    variableValues: JSON.stringify(variableValues)
  }

  const log = {
    clientSession,
    clientInfo: {
      ipAddress: ctx.request.headers['X-Real-IP'] || ctx.request.ip,
      userAgent: ctx.request.headers['user-agent']
    },
    info: {
      queryHash: hash(query),
      ...query
    },
    referrer,
    createdAt: new Date(),
    apiVersion: packageJson.version,
    type: 'query'
  }

  logToMongo(log)

  return {
    id: hash(JSON.stringify(log))
  }
}
