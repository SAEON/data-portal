import mongodb from 'mongodb'
const { ObjectId } = mongodb

export default async (_, { ids = null }, ctx) => {
  const { findFilters } = ctx.mongo.dataFinders

  if (!ids) {
    throw new Error(
      'Please specify IDs of filters - it will be supported to query all filters via pagniation if this is ever required'
    )
  }

  return await findFilters({ _id: { $in: ids.map(id => ObjectId(id)) } })
}
