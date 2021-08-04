import { ObjectId } from 'mongodb'

export default async (ctx, name) => {
  const { findRoles, findUsers } = ctx.mongo.dataFinders

  if (!ctx.userInfo) {
    ctx.throw(401)
    return
  }

  const { userInfo } = ctx
  const { _id } = userInfo
  const roleId = (await findRoles({ name }))[0]._id
  const roles = (await findUsers({ _id: ObjectId(_id) }))[0].roles.map(id => id.toString())

  if (!roles.includes(roleId.toString())) {
    ctx.throw(403)
  }
}
