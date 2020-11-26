import { defaultDiskLayers, defaultWebLayers } from '../../../../../postgis/setup/default-layers.js'
import makeSql from './sql.js'

const sharedTables = Object.keys(Object.assign({}, defaultWebLayers, defaultDiskLayers))

export default async (self, args, ctx) => {
  const { _id: schema, authentication } = self.doc
  const { username, password } = authentication
  const { query } = ctx.postgis

  const response = await query({
    text: makeSql(sharedTables),
    values: [schema.toString(), ...sharedTables],
    client: {
      user: username,
      password,
    },
  })
  return {
    id: schema,
    databook: self.doc,
    tables: response.rows.reduce((a, c) => {
      return [
        ...(a || []),
        Object.fromEntries(Object.entries(c).filter(([k]) => !['table_schema'].includes(k))),
      ]
    }, []),
  }
}
