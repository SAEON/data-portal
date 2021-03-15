import mongodb from 'mongodb'
const { ObjectID } = mongodb

export default async (_, { id }, ctx) => {
  const _id = ObjectID(id)
  const { Dashboards } = await ctx.mongo.collections
  return await Dashboards.findOne({ _id })
}
