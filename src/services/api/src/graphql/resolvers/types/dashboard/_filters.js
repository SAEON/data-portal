import mongo from 'mongodb'
const { ObjectID } = mongo

/**
 * TODO - fails if a dashboard doesn't have filters
 */
export default async ({ filters }, args, ctx) => {
  return []
  const filterIds = filters.map(({ _id }) => ObjectID(_id))
  const { findFilters } = ctx.mongo.dataFinders
  return await findFilters({ _id: { $in: filterIds || [] } })
}
