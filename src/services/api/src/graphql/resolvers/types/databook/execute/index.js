export default async (self, args, ctx) => {
  const { authentication } = self.doc
  const { username, password } = authentication
  const { query } = ctx.postgis
  const { sql: text } = args

  const response = await query({
    text,
    client: {
      user: username,
      password,
    },
  })

  return response.rows
}
