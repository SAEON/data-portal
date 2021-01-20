import mongodb from 'mongodb'
const { ObjectID } = mongodb

export default async (self, args, ctx) => {
  const { id } = args
  const { Lists } = await ctx.mongo.collections
  const result = await Lists.findOne({ _id: ObjectID(id) })
  return result
}
