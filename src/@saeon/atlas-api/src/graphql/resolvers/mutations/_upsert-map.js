import { ObjectID } from 'mongodb'

export default async (self, args, ctx) => {
  const { Maps } = await ctx.mongo.collections

  const { input: $set, id = null } = args
  const { value: map } = await Maps.findOneAndUpdate(
    {
      _id: id || ObjectID(),
    },
    {
      $set,
    },
    {
      upsert: true,
      returnOriginal: false,
    }
  )

  return map
}
