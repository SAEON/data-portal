import { ObjectId } from 'mongodb'

/**
 * TODO
 * Once Mongo Docker is updated to v5, look at options for
 * joining in a single query
 */
export default async (ctx, ...permissions) => {
  permissions = permissions.map(({ name }) => name)
  const { findRoles, findUsers, findPermissions } = ctx.mongo.dataFinders

  if (!ctx.userInfo) {
    ctx.throw(401)
    return
  }

  const { userInfo } = ctx
  const { id: userId } = userInfo

  /**
   * First get permission IDs from permission names
   */
  const permissionIds = (await findPermissions({ name: { $in: permissions } })).map(
    ({ _id }) => _id
  )

  /**
   * Then get the roles that have those permissions
   */
  const roleIds = (await findRoles({ permissions: { $in: permissionIds } })).map(({ _id }) => _id)

  /**
   * Then see if there is a user with these roles, and the userid
   */
  const user = (await findUsers({ _id: ObjectId(userId), roles: { $in: roleIds } }))[0]

  /**
   * If there is no user,
   * then throw forbidden
   */
  if (!user) {
    ctx.throw(403)
  }
}
