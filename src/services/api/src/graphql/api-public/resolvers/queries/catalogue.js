import hash from 'object-hash'
import packageJson from '../../../../../package.json'
import { CATALOGUE_CLIENT_ID } from '../../../../config.js'

export default async (_, args, ctx, info) => {
  const referrer = args?.referrer || undefined
  const clientSession = ctx?.cookies.get(CATALOGUE_CLIENT_ID) || undefined
  const { operation, fragments, variableValues } = info
  const { logToMongo } = ctx.mongo

  const query = {
    operation: JSON.stringify(operation),
    fragments: JSON.stringify(fragments),
    variableValues: JSON.stringify(variableValues),
  }

  const log = {
    clientSession,
    clientInfo: {
      ipAddress: ctx.request.headers['X-Real-IP'] || ctx.request.ip,
      userAgent: ctx.request.headers['user-agent'],
    },
    info: {
      queryHash: hash(query),
      ...query,
    },
    referrer,
    createdAt: new Date(),
    apiVersion: packageJson.version,
    type: 'query',
  }

  logToMongo(log)

  return {
    id: hash(JSON.stringify(log)),
  }
}
