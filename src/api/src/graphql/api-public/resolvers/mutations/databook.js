import { ObjectId } from 'mongodb'

export default async (self, { id }, ctx) => {
  const { Databooks } = await ctx.mongo.collections
  return await Databooks.findOne({ _id: ObjectId(id) })
}
