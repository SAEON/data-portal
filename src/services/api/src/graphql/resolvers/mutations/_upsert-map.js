import mongodb from 'mongodb'

const { ObjectID } = mongodb

export default async (self, args, ctx) => {
  const { input, id = null } = args
  const { Maps } = await ctx.mongo.collections

  const { value: map } = await Maps.findOneAndUpdate(
    {
      _id: id || ObjectID(),
    },
    {
      $set: Object.assign({ type: 'Map', input }),
    },
    {
      upsert: true,
      returnOriginal: false,
    }
  )

  return map
}
