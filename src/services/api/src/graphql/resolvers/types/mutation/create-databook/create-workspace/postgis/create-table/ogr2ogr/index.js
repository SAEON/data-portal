import ogr2ogr from '../../../../../../../../../lib/ogr2ogr.js'

export default (databook, tableName, pathToShapefile) => {
  const { _id: schema, authentication } = databook
  const { username, password } = authentication

  return ogr2ogr({ tableName, username, password, pathToShapefile, schema })
}
