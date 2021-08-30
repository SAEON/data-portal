import mongodb from 'mongodb'
const { ObjectId } = mongodb
import hash from 'object-hash'

export default async (self, args, ctx) => {
  const { search, createdBy } = args
  const { Lists } = await ctx.mongo.collections

  const result = await Lists.findOneAndUpdate(
    {
      hashedSearch: hash(search),
    },
    {
      $setOnInsert: {
        _id: ObjectId(),
        hashedSearch: hash(search),
        search,
        createdAt: new Date(),
        createdBy,
      },
      $set: {
        modifiedAt: new Date(),
      },
    },
    {
      upsert: true,
      returnDocument: 'after',
    }
  )

  return result.value._id.toString()
}