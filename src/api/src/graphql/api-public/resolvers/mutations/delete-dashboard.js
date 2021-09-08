import { ObjectId } from 'mongodb'

export default async (_, { id }, ctx) => {
  const { Dashboards } = await ctx.mongo.collections
  const { acknowledged } = await Dashboards.deleteOne({
    _id: ObjectId(id),
  })
  return acknowledged
}
