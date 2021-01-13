export default async (self, args, ctx) => {
  await ctx.userModel.checkRole(ctx, 'datascientist')

  const { authentication } = self.doc
  const { username, password: encryptedPassword } = authentication
  const { query } = ctx.postgis
  const { sql } = args
  const { decrypt } = ctx.crypto

  const password = decrypt(encryptedPassword)

  const response = await query({
    text: `${sql}`,
    client: {
      user: username,
      password,
    },
  })

  return response.rows
}
