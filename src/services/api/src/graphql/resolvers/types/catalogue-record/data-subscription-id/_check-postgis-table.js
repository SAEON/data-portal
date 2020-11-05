import { query } from '../../../../../postgis/index.js'

export default async ({ layerId }) =>
  (
    await query({
      text: `select exists (
              select from information_schema.tables
              where table_schema = 'public'
              and table_name = $1
            )`,
      values: [layerId],
      name: layerId,
    })
  ).rows[0].exists
