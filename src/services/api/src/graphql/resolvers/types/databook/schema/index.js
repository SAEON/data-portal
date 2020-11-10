import { readFile } from 'fs'
import getCurrentDirectory from '../../../../../lib/get-current-directory.js'
import { join } from 'path'
const __dirname = getCurrentDirectory(import.meta)

/**
 * Load the SQL string on startup and just keep
 * it cached
 */
const sql = await new Promise((resolve, reject) =>
  readFile(join(__dirname, './schema.sql'), { encoding: 'utf8' }, (error, data) =>
    error ? reject(error) : resolve(data)
  )
)

export default async (self, args, ctx) => {
  const { _id: schema, authentication } = self.doc
  const { username, password } = authentication
  const { query } = ctx.postgis

  const response = await query({
    text: sql,
    values: [schema.toString()],
    client: {
      user: username,
      password,
    },
  })

  return response.rows
}
