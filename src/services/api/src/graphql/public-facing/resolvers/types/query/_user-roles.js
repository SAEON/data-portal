export default async (self, args, ctx) => {
  await ctx.userModel.ensureAuthenticated(ctx)
  const { findUserRoles } = await ctx.mongo.dataFinders
  return await findUserRoles({})
}
