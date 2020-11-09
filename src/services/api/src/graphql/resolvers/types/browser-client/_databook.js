import mongodb from 'mongodb'
const { ObjectID } = mongodb
import hash from 'object-hash'

export default async (self, args, ctx) => {
  const { id } = args
  const { Databooks } = await ctx.mongo.collections
  const doc = await Databooks.findOne({ _id: ObjectID(id) })
  return doc
    ? {
        id: hash(doc.tables),
        doc,
      }
    : undefined
}
