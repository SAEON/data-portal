import raster2pgsql from '../../../../../../../lib/raster2pgsql.js'

export default async (ctx, databook, tableName, filePath) => {
  const { _id: schema, authentication } = databook
  const { username, password: encryptedPassword } = authentication
  const { decrypt } = ctx.crypto
  const password = decrypt(encryptedPassword)

  await raster2pgsql({ tableName, username, password, filePath, schema })
}
