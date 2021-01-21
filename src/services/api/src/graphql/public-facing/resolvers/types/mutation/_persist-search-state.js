import mongodb from 'mongodb'
const { ObjectID } = mongodb
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
        _id: ObjectID(),
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
      returnNewDocument: true,
    }
  )

  return (result.value?._id || result.lastErrorObject?.upserted).toString()
}
