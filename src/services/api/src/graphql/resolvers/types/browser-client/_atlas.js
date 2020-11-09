import mongodb from 'mongodb'
const { ObjectID } = mongodb

export default async (self, args, ctx) => {
  const { id } = args
  const { Atlases } = await ctx.mongo.collections
  const result = await Atlases.findOne({ _id: ObjectID(id) })
  return result
}
