import mongo from 'mongodb'
const { ObjectID } = mongo

//STEVEN: Im unsure of the purporse of this actually. self contains all associated filters.
//Should this not just return self.filters. There is similar logic in _charts.js
export default async (self, args, ctx) => {
  const { filters } = self
  const filterIds = filters.map(({ _id }) => ObjectID(_id))
  const { findFilters } = ctx.mongo.dataFinders
  const hereFilters = await findFilters({ _id: { $in: filterIds || [] } })
  return hereFilters
}
