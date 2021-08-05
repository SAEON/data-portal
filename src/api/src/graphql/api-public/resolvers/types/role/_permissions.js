export default async ({ permissions }, args, ctx) => {
  const { findPermissions } = ctx.mongo.dataFinders
  return await findPermissions({ _id: { $in: permissions } })
}
