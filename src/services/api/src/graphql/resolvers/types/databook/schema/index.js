import defaultLayers from '../../../../../lib/default-postgis-layers.js'
import makeSql from './sql.js'

const sharedTables = Object.keys(Object.assign({}, defaultLayers))

export default async (self, args, ctx) => {
  await ctx.userModel.checkRole(ctx, 'datascientist')

  const { _id: schema, authentication } = self.doc
  const { username, password: encryptedPassword } = authentication
  const { query } = ctx.postgis
  const { decrypt } = ctx.crypto

  const password = decrypt(encryptedPassword)

  const response = await query({
    text: makeSql(sharedTables),
    values: [schema.toString(), ...sharedTables],
    client: {
      user: username,
      password,
    },
  })

  const tables = response.rows.reduce((a, c) => {
    return [...(a || []), Object.fromEntries(Object.entries(c))]
  }, [])

  return {
    id: schema,
    databook: self.doc,
    tables,
  }
}
