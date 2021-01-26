import mongodb from 'mongodb'
const { ObjectID } = mongodb
import hash from 'object-hash'
import createDataName from './_create-data-name.js'
import { nanoid } from 'nanoid'

export default async (records, ctx, createdBy) => {
  const { Databooks } = await ctx.mongo.collections
  const { encrypt } = ctx.crypto
  const recordsIds = records.map(({ _source: _ }) => _.id)

  const userId = ObjectID(ctx.userInfo._id)

  const _id = ObjectID()
  const password = encrypt(nanoid(36))

  return Databooks.insertOne({
    _id,
    userId,
    hash: hash(recordsIds),
    type: 'postgis',
    authentication: {
      username: _id.toString(),
      password,
    },
    tables: Object.fromEntries(
      recordsIds.map(id => [[createDataName(id)], { ready: false, recordId: id }])
    ),
    createdBy,
    modifiedAt: new Date(),
  })
}
