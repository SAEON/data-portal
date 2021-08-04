export default async (self, args, ctx) => {
  await ctx.user.ensureAuthenticated(ctx)
  const { findRoles } = await ctx.mongo.dataFinders
  return await findRoles({})
}
