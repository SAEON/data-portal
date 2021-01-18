export default async (self, args, ctx) => {
  await ctx.userModel.checkRole(ctx, 'datascientist')

  const { id: currentTableName } = self
  const { authentication, _id: schema } = self.databook
  const { username, password: encryptedPassword } = authentication
  const { name: newTableName } = args
  const { query } = ctx.postgis
  const password = ctx.crypto.decrypt(encryptedPassword)

  const sql = `
  begin;
    alter table "${schema}"."${currentTableName}" rename to "${newTableName}";
    update "${schema}".odp_map set table_name = '${newTableName}' where table_name = '${currentTableName}';
  commit;`

  await query({
    text: sql,
    client: {
      user: username,
      password,
    },
  })

  return true
}
