import { ObjectId } from 'mongodb'

export default async (_, args, ctx) => {
  const { Databooks } = await ctx.mongo.collections

  const { id, ...otherArgs } = args
  const $set = { ...otherArgs, modifiedAt: new Date() }

  const response = await Databooks.findOneAndUpdate(
    { _id: ObjectId(id) },
    {
      $set,
    },
    {
      returnDocument: 'after',
      upsert: false,
    }
  )

  return response.value
}
