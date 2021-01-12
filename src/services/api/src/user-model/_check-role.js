export default async (ctx, name) => {
  const { findUserRoles } = ctx.mongo.dataFinders
  const { userRoles = [] } = ctx?.userInfo || {}
  const roleId = (await findUserRoles({ name }))[0]._id

  if (!userRoles.includes(roleId.toString())) {
    ctx.throw(403)
  }
}
