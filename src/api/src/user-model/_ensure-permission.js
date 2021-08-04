export default async (ctx, ...permissions) => {
  const { Users } = ctx.mongo.collections

  if (!ctx.userInfo) {
    ctx.throw(401)
    return
  }

  const { userInfo } = ctx
  const { id: userId } = userInfo

  //  TODO

  if (!isAuthorized) {
    ctx.throw(403)
  }
}
