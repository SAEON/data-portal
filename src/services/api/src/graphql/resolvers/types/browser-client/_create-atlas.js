import mongodb from 'mongodb'
const { ObjectID } = mongodb
import hash from 'object-hash'

export default async (self, args, ctx) => {
  const { state, createdBy } = args
  const { Atlases } = await ctx.mongo.collections

  const result = await Atlases.findOneAndUpdate(
    {
      hashedState: hash(state),
    },
    {
      $setOnInsert: {
        _id: ObjectID(),
        hashedState: hash(state),
        state,
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
