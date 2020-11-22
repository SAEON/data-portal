import mongodb from 'mongodb'
const { ObjectID } = mongodb

export default async (_, { id }, ctx) => {
  const { findCharts } = ctx.mongo.dataFinders
  return (await findCharts({ _id: ObjectID(id) }))[0]
}
