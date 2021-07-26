import mongodb from 'mongodb'
const { ObjectId } = mongodb

export default async (_, { ids }, ctx) => {
  const { findCharts } = ctx.mongo.dataFinders
  return await findCharts({ _id: { $in: ids.map(id => ObjectId(id)) } })
}
