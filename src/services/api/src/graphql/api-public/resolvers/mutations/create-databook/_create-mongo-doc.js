import mongodb from 'mongodb'
const { ObjectID } = mongodb
import hash from 'object-hash'
import { nanoid } from 'nanoid'

const createDataName = (id, type = 'odp') => `${type.replace('-archive', '')}-${id}`

export default async (records, ctx, createdBy) => {
  const { Databooks } = await ctx.mongo.collections

  const { encrypt } = ctx.crypto

  const userId = ObjectID(ctx.userInfo._id)

  const _id = ObjectID()
  const password = encrypt(nanoid(36))

  return Databooks.insertOne({
    _id,
    userId,
    hash: hash(records.map(({ _source }) => _source.id)),
    authentication: {
      username: _id.toString(),
      password,
    },
    tables: Object.fromEntries(
      records.map(({ _source }) => {
        const { id, immutableResource } = _source
        const { resourceDownload } = immutableResource
        const { archive, archivedFormats, fileFormat } = resourceDownload

        const type = fileFormat?.includes('nc')
          ? 'netcdf'
          : archive && archivedFormats?.includes('shp')
          ? 'shapefile-archive'
          : archive && archivedFormats?.includes('asc')
          ? 'asc-archive'
          : 'unknown'

        return [[createDataName(id, type)], { ready: false, recordId: id, type }]
      })
    ),
    createdBy,
    modifiedAt: new Date(),
  })
}
