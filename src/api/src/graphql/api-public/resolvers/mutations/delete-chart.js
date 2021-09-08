import { ObjectId } from 'mongodb'

export default async (_, { id }, ctx) => {
  const { Charts } = await ctx.mongo.collections
  const { acknowledged } = await Charts.deleteOne({ _id: ObjectId(id) })
  return acknowledged
}
