export default async (self, args, ctx) => {
  const { findPermissions } = await ctx.mongo.dataFinders
  return (await findPermissions({})).sort(({ name: a }, { name: b }) => {
    if (a > b) return 1
    if (a < b) return -1
    return 0
  })
}
