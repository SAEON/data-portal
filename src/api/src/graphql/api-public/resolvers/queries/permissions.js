export default async (self, args, ctx) => {
  const { findPermissions } = await ctx.mongo.dataFinders
  return await findPermissions({})
}
