import mongodb from 'mongodb'
const { ObjectID } = mongodb

export default async (self, args, ctx) => {
  const { id } = args
  const { SavedSearches } = await ctx.mongo.collections
  const result = await SavedSearches.findOne({ _id: ObjectID(id) })
  return result
}
