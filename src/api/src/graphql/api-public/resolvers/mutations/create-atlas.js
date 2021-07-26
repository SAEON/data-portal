import { ObjectId } from 'mongodb'
import hash from 'object-hash'

export default async (self, args, ctx) => {
  const { search, createdBy } = args
  const { Atlases } = await ctx.mongo.collections

  const result = await Atlases.findOneAndUpdate(
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
      returnOriginal: false,
    }
  )

  return (result.value?._id || result.lastErrorObject?.upserted).toString()
}
