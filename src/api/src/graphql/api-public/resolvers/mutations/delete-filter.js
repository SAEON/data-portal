import { ObjectId } from 'mongodb'

export default async (_, { id }, ctx) => {
  const { Filters } = await ctx.mongo.collections
  const { acknowledged } = await Filters.deleteOne({ _id: ObjectId(id) })
  return acknowledged
}
