import mongo from 'mongodb'
const { ObjectID } = mongo

export default async ({ filters: filterIds }, args, ctx) => {
  const { findFilters } = ctx.mongo.dataFinders
  return await findFilters({ _id: { $in: (filterIds || []).map(id => ObjectID(id)) } })
}
