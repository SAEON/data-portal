import { ObjectId } from 'mongodb'

export default async (self, args, ctx) => {
  const { id, search, createdBy, ...otherFields } = args
  const { Lists } = await ctx.mongo.collections

  const _id = ObjectId()

  const result = await Lists.findOneAndUpdate(
    {
      _id: id ? ObjectId(id) : _id,
    },
    {
      $setOnInsert: {
        _id,
        createdAt: new Date(),
        createdBy,
      },
      $set: {
        modifiedAt: new Date(),
        search,
        ...otherFields,
      },
    },
    {
      upsert: true,
      returnDocument: 'after',
    }
  )

  return result.value
}
