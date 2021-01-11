import mongo from 'mongodb'
const { ObjectID } = mongo

export default async (/*{ charts: chartIds }*/ self, args, ctx) => {
  const { charts: chartIds } = self //STEVEN: potential bug. self doesn't seem to contain a charts prop.
  const { findCharts } = ctx.mongo.dataFinders
  return await findCharts({ _id: { $in: (chartIds || []).map(id => ObjectID(id)) } })
}
