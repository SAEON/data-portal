import mongo from 'mongodb'
const { ObjectID } = mongo

export default async (_, args, ctx) => {
  const { Dashboards } = await ctx.mongo.collections
  const { name, databookId } = args

  return (
    await Dashboards.insertOne({
      databookId: ObjectID(databookId),
      modifiedAt: new Date(),
      name,
    })
  ).ops[0]
}
