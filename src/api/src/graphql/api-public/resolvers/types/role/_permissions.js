export default async ({ permissions }, args, ctx) => {
  const { findPermissions } = ctx.mongo.dataFinders
  return (await findPermissions({ _id: { $in: permissions } })).sort(({ name: a }, { name: b }) => {
    if (a > b) return 1
    if (a < b) return -1
    return 0
  })
}
