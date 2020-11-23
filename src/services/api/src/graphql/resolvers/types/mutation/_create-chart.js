import mongo from 'mongodb'
const { ObjectID } = mongo

export default async (databook, args, ctx) => {
  const { Charts } = await ctx.mongo.collections
  const { name, databookId } = args

  return (
    await Charts.insertOne({
      databookId: ObjectID(databookId),
      modifiedAt: new Date(),
      name,
    })
  ).ops[0]
}
