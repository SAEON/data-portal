import mongo from 'mongodb'
const { ObjectID } = mongo

export default async (/*{ charts: chartIds }*/ self, args, ctx) => {
  console.log('self', self)
  console.log('chartIds', chartIds)
  const { findCharts } = ctx.mongo.dataFinders
  return await findCharts({ _id: { $in: (chartIds || []).map(id => ObjectID(id)) } })
}
