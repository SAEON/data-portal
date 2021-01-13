export default async ctx => {
  await ctx.userModel.checkRole(ctx, 'datascientist')
  ctx.body = 'hi'
}
