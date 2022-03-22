export default async (self, args, ctx) => {
  const { findRoles } = await ctx.mongo.dataFinders
  return await findRoles({})
}
