export default async (self, args, ctx) => {
  const { _id: schema, authentication } = self.doc
  const { username, password } = authentication
  const { query } = ctx.postgis
  const { sql: text } = args

  const rows = await query({
    text,
    client: {
      user: username,
      password,
    },
  })

  return rows
}
