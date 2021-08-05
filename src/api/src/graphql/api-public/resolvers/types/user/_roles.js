export default async ({ roles }, args, ctx) => {
  const { findRoles } = ctx.mongo.dataFinders
  return await findRoles({ _id: { $in: roles } })
}
