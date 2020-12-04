import mongo from 'mongodb'
const { ObjectID } = mongo

export default async ({ charts: chartIds }, args, ctx) => {
  const { findCharts } = ctx.mongo.dataFinders
  return await findCharts({ _id: { $in: (chartIds || []).map(id => ObjectID(id)) } })
}
