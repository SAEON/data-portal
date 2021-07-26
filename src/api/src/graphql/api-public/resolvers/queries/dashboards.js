import mongodb from 'mongodb'
const { ObjectId } = mongodb

export default async (_, { ids }, ctx) => {
  const { findDashboards } = ctx.mongo.dataFinders
  return await findDashboards({ _id: { $in: ids.map(id => ObjectId(id)) } })
}
