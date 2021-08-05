import { ObjectId } from 'mongodb'

export default async (self, args, ctx) => {
  const { id } = args
  const { Lists } = await ctx.mongo.collections
  const result = await Lists.findOne({ _id: ObjectId(id) })
  return result
}
