import collections from './collections/index.js'
import roles from '../user-model/roles.js'

export default async db => {
  for (const role of roles) {
    const { name, permissions, ...other } = role

    let _permissions = []
    for (const permission of permissions) {
      const { name, ...other } = permission
      const permissionQueryResult = await db
        .collection(collections.Permissions.name)
        .findOneAndUpdate(
          { name },
          { $setOnInsert: { name }, $set: { ...other } },
          { upsert: true, returnOriginal: false }
        )

      const upsertedPermission =
        permissionQueryResult.value ||
        (await db.collection(collections.Permissions.name).findOne({
          _id: permissionQueryResult.lastErrorObject.upserted,
        }))

      _permissions.push(upsertedPermission._id)
    }

    await db.collection(collections.Roles.name).findOneAndUpdate(
      { name },
      {
        $setOnInsert: { name },
        $set: { ...other },
        $addToSet: {
          permissions: {
            $each: _permissions,
          },
        },
      },
      { upsert: true }
    )
  }
}
