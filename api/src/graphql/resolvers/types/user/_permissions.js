export default async ({ roles }, args, ctx) => {
  const { findRoles, findPermissions } = ctx.mongo.dataFinders

  const permissionIds = (await findRoles({ _id: { $in: roles } }))
    .map(({ permissions }) => permissions)
    .flat()

  return await findPermissions({ _id: { $in: permissionIds } })
}
