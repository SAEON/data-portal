export default async (databook, args, ctx) => {
  const { Charts } = await ctx.mongo.collections
  const { name } = args

  return (
    await Charts.insertOne({
      databookId: databook.doc._id,
      modifiedAt: new Date(),
      name,
    })
  ).ops[0]
}
