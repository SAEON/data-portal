import query from './_query.js'
import permissions from '../../../../user-model/permissions.js'
import { ensurePermission } from '../../../../user-model/index.js'

const { documentTypePermissions } = permissions['logs:view']

const permissionToDocumentType = Object.fromEntries(
  Object.entries(documentTypePermissions).map(([key, value]) => [value, key])
)

export default async (
  self,
  { sort = { dimension: 'count', direction: 'DESC' }, type, limit = 50000 },
  ctx,
  c
) => {
  /**
   * Create a match clause for the type, based on user permissions
   * (1) If no type is specified, include the permissions the user has
   * (2) Otherwise specifically check that the user has access to the requested type
   */

  const permissionsToCheck = [
    documentTypePermissions[type] || Object.values(documentTypePermissions),
  ].flat()

  const types = []
  for (const permission of permissionsToCheck) {
    await ensurePermission(ctx, { name: permission })
      .then(() => types.push(permissionToDocumentType[permission]))
      .catch(() => null)
  }

  const $match = { $match: { type: { $in: types } } }
  const $limit = { $limit: limit }

  const selectionSet = c.fieldNodes
    .find(({ name }) => name.value === 'logs')
    .selectionSet.selections.map(({ name, arguments: args }) => {
      return { name, args }
    })

  const { Logs } = await ctx.mongo.collections
  const result = await Logs.aggregate(query({ selectionSet, sort, $match, $limit }))

  return await result.toArray()
}
