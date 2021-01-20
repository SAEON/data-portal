import mongodb from 'mongodb'
const { ObjectID } = mongodb

export default async (_, { ids = null }, ctx) => {
  const { findCharts } = ctx.mongo.dataFinders

  if (!ids) {
    throw new Error(
      'Please specify IDs of charts - it will be supported to query all charts via pagniation if this is ever required'
    )
  }

  return await findCharts({ _id: { $in: ids.map(id => ObjectID(id)) } })
}
