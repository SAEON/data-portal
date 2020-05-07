import { ObjectID } from 'mongodb'

export default async (self, args, ctx) => {
  const { Events } = await ctx.mongo.collections

  const { input: $set } = args
  await Events.findOneAndUpdate(
    {
      _id: ObjectID(),
    },
    {
      $set: Object.assign({ type: 'BrowserEvent' }, $set), // TODO - should use the GraphQL enum
    },
    {
      upsert: true,
      returnOriginal: false,
    }
  )
}
