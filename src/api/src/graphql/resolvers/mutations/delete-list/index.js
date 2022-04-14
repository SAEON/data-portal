import { ObjectId } from 'mongodb'

export default async (self, { id }, ctx) => {
  const { Lists } = await ctx.mongo.collections
  const { acknowledged, deletedCount } = await Lists.deleteOne({
    _id: ObjectId(id),
    type: 'curated',
  })

  if (!acknowledged) {
    throw new Error(`Unable to delete list (ID ${id})`)
  }

  return Boolean(deletedCount)
}
