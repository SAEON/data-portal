export default async (_, args, ctx) => {
  const { query } = ctx.postgis
  const { sql: text } = args

  const rows = await query({
    text,
  })

  console.log(rows)
  return rows
}
