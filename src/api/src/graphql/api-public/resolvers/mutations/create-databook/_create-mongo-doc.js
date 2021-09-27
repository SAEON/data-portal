import { ObjectId } from 'mongodb'
import hash from 'object-hash'
import { nanoid } from 'nanoid'

const createDataName = (id, type = 'odp') => `${type.replace('-archive', '')}-${id}`

export default async (records, ctx, createdBy) => {
  const { Databooks } = await ctx.mongo.collections

  const { encrypt } = ctx.crypto

  const userId = ObjectId(ctx.userInfo._id)

  const _id = ObjectId()
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
        const { resourceDownload, _fileFormat, _archive } = immutableResource
        let { archive, archivedFormats, fileFormat } = resourceDownload
        archive = archive || _archive
        fileFormat = fileFormat || _fileFormat

        const type = fileFormat?.toLowerCase().includes('nc')
          ? 'netcdf'
          : archive &&
            (fileFormat === 'SHAPEFILE' ||
              archivedFormats?.map(f => f.toLowerCase()).includes('shp'))
          ? 'shapefile-archive'
          : archive && archivedFormats?.map(f => f.toLowerCase()).includes('asc')
          ? 'asc-archive'
          : 'unknown'

        return [[createDataName(id, type)], { ready: false, recordId: id, type }]
      })
    ),
    createdBy,
    modifiedAt: new Date(),
  })
}
