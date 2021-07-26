import mongodb from 'mongodb'
const { ObjectId } = mongodb

export default async (_, { id }, ctx) => {
  const _id = ObjectId(id)
  const { Dashboards } = await ctx.mongo.collections
  return await Dashboards.findOne({ _id })
}
