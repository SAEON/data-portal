import { ObjectId } from 'mongodb'

export default async (_, args, ctx) => {
  const { Charts } = await ctx.mongo.collections
  const { databookId, ..._args } = args

  const result = await Charts.findOneAndUpdate(
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
