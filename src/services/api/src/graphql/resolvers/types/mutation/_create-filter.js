import mongo from 'mongodb'
const { ObjectID } = mongo

export default async (databook, args, ctx) => {
  await ctx.userModel.ensureDataScientist(ctx)

  const { Filters } = await ctx.mongo.collections
  const { databookId, ..._args } = args

  return (
    await Filters.insertOne({
      databookId: ObjectID(databookId),
      modifiedAt: new Date(),
      ..._args,
    })
  ).ops[0]
}
