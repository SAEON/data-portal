import collections from './collections/index.js'
import roles from '../user-model/roles.js'

export default async db => {
  /**
   * Loop through the roles configuration object
   */
  for (const role of roles) {
    const { name, permissions, ...other } = role

    /**
     * Roles configuration has a list of permission
     * names for each role. Make sure that these permissions
     * exist in the database, and keep track of IDs
     */
    const permissionDocIds = []
    for (const permission of permissions) {
      const { name, ...other } = permission
      permissionDocIds.push(
        (
          await db
            .collection(collections.Permissions.name)
            .findOneAndUpdate(
              { name },
              { $setOnInsert: { name }, $set: { ...other } },
              { upsert: true, returnDocument: 'after' }
            )
        ).value._id
      )
    }

    /**
     * Make sure that the roles exist in the DB
     * and have at least the default permissions
     */
    await db.collection(collections.Roles.name).findOneAndUpdate(
      { name },
      {
        $setOnInsert: { name },
        $set: { ...other },
        $addToSet: {
          permissions: {
            $each: permissionDocIds,
          },
        },
      },
      { upsert: true }
    )
  }

  /**
   * Remove permissions not associated with any roles
   * And any roles in the database that are not in the
   * source code
   **/
  const { permissions: activePermissions, roles: activeRoles } = roles.reduce(
    (acc, role) => ({
      permissions: [...new Set([...acc.permissions, ...role.permissions.map(({ name }) => name)])],
      roles: [...new Set([...acc.roles, role.name])],
    }),
    { permissions: [], roles: [] }
  )

  // Delete obsolete permissions
  await db
    .collection(collections.Permissions.name)
    .deleteMany({ name: { $nin: activePermissions } })

  // Delete obsolute roles
  await db.collection(collections.Roles.name).deleteMany({ name: { $nin: activeRoles } })
}
