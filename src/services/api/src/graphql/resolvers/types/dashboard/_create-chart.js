export default async (dashboard, args, ctx) => {
  const { Charts } = await ctx.mongo.collections
  const { name } = args

  return (
    await Charts.insertOne({
      dashboardId: dashboard._id,
      modifiedAt: new Date(),
      name,
    })
  ).ops[0]
}
