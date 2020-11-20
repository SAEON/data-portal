export default async (databook, args, ctx) => {
  const { Dashboards } = await ctx.mongo.collections
  const { name } = args

  return (
    await Dashboards.insertOne({
      databookId: databook.doc._id,
      modifiedAt: new Date(),
      name,
    })
  ).ops[0]
}
