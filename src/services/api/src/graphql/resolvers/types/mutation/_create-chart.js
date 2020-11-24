import mongo from 'mongodb'
const { ObjectID } = mongo

export default async (databook, args, ctx) => {
  const { Charts } = await ctx.mongo.collections
  const { databookId, ..._args } = args

  return (
    await Charts.insertOne({
      databookId: ObjectID(databookId),
      modifiedAt: new Date(),
      ..._args,
    })
  ).ops[0]
}
