import mongodb from 'mongodb'
const { ObjectID } = mongodb

export default async (self, args, ctx) => {
  console.log('im the bc')
  const { id } = args
  const { Databooks } = await ctx.mongo.collections
  const result = await Databooks.findOne({ _id: ObjectID(id) })
  return result
}
