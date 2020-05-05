import { ObjectID } from 'mongodb'

export default async (self, args, ctx) => {
  const { Maps } = await ctx.mongo.collections

  const { value: map } = await Maps.findOneAndUpdate(
    {
      _id: ObjectID(),
    },
    {
      $set: {
        name: 'some-name',
      },
    },
    {
      upsert: true,
      returnOriginal: false,
    }
  )

  return map
}
