import { ObjectId } from 'mongodb'

export default async (databook, args, ctx) => {
  const { Filters } = await ctx.mongo.collections
  const { databookId, ..._args } = args

  const result = await Filters.findOneAndUpdate(
    {
      _id: ObjectId(),
    },
    {
      $set: {
        databookId: ObjectId(databookId),
        modifiedAt: new Date(),
        ..._args,
      },
    },
    {
      upsert: true,
      returnDocument: 'after',
    }
  )

  return result.value
}
