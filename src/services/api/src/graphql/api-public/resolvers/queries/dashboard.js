import mongodb from 'mongodb'
const { ObjectID } = mongodb

export default async (_, args, ctx) => {
  const { id } = args
  const { Dashboards } = await ctx.mongo.collections
  return await Dashboards.findOne({ _id: ObjectID(id) })
}
