import { query } from '../postgis/index.js'

export default async tableName =>
  (
    await query({
      text: `select exists (
              select from information_schema.tables
              where table_schema = 'public'
              and table_name = $1
            )`,
      values: [tableName],
      name: tableName,
    })
  ).rows[0].exists
