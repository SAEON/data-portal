import { ObjectId } from 'mongodb'

export default async (ctx, name) => {
  const { findUserRoles, findUsers } = ctx.mongo.dataFinders

  if (!ctx.userInfo) {
    ctx.throw(401)
    return
  }

  const { userInfo } = ctx
  const { _id } = userInfo
  const roleId = (await findUserRoles({ name }))[0]._id
  const userRoles = (await findUsers({ _id: ObjectId(_id) }))[0].userRoles.map(id => id.toString())

  if (!userRoles.includes(roleId.toString())) {
    ctx.throw(403)
  }
}
