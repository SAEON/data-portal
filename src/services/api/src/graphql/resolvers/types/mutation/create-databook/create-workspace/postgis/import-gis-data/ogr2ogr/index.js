import ogr2ogr from '../../../../../../../../../lib/ogr2ogr.js'

export default (ctx, databook, tableName, pathToShapefile) => {
  const { _id: schema, authentication } = databook
  const { username, password: encryptedPassword } = authentication
  const { decrypt } = ctx.crypto
  const password = decrypt(encryptedPassword)

  return ogr2ogr({ tableName, username, password, pathToShapefile, schema })
}
