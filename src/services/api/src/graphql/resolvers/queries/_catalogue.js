import hash from 'object-hash'
import packageJson from '../../../../package.json'

export default async (_, args, ctx, info) => {
  const referrerId = args?.referrerId || undefined
  const clientSession = ctx?.cookies.get('ClientSession') || undefined
  const { operation, fragments, variableValues } = info
  const { Logs } = await ctx.mongo.collections

  const query = {
    operation: JSON.stringify(operation),
    fragments: JSON.stringify(fragments),
    variableValues: JSON.stringify(variableValues),
  }

  const log = {
    clientSession,
    referrerId,
    apiVersion: packageJson.version,
    type: 'query',
    queryHash: hash(query),
    ...query,
  }

  await Logs.insertMany([log])

  return {
    id: hash(JSON.stringify(log)),
  }
}
