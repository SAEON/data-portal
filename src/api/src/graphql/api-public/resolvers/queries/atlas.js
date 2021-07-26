import mongodb from 'mongodb'
const { ObjectId } = mongodb

export default async (self, args, ctx) => {
  const { id } = args
  const { Atlases } = await ctx.mongo.collections
  const result = await Atlases.findOne({ _id: ObjectId(id) })
  return result
}
