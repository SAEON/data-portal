import mongodb from 'mongodb'
const { ObjectID } = mongodb

export default async (_, args, ctx) => {
  const { databookId } = args
  const { Dashboards } = await ctx.mongo.collections
  return await Dashboards.find({ databookId: ObjectID(databookId) }).toArray()
}
