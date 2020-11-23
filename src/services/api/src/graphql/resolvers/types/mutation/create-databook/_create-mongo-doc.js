import mongodb from 'mongodb'
const { ObjectID } = mongodb
import hash from 'object-hash'
import createDataName from './_create-data-name.js'

export default async (records, ctx, createdBy) => {
  const { Databooks } = await ctx.mongo.collections
  const recordsIds = records.map(({ _source: _ }) => _.id)
  const _id = ObjectID()
  return Databooks.insertOne({
    _id,
    hash: hash(recordsIds),
    type: 'postgis',
    authentication: {
      username: _id.toString(),
      password: _id.toString(),
    },
    tables: Object.fromEntries(recordsIds.map(id => [[createDataName(id)], { ready: false }])),
    createdBy,
    modifiedAt: new Date(),
  })
}
