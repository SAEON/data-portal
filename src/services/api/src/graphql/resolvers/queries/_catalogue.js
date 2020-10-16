import packageJson from '../../../../package.json'

export default async (_, args, ctx, info) => {
  const referrerId = args?.referrerId || undefined
  const clientSession = ctx.cookies.get('ClientSession')
  const { operation, fragments, variableValues } = info

  // TODO log to Mongo
  const log = {
    clientSession,
    referrerId,
    operation,
    fragments,
    variableValues,
    apiVersion: packageJson.version,
    type: 'query',
  }

  return {
    id: 'catalogue', // TODO: ID could be a hash of self, args?
  }
}
