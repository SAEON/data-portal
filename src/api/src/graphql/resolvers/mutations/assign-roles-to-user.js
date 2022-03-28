import { ObjectId } from 'mongodb'
import { sysadmin } from '../../../user-model/roles.js'

export default async (self, { userId, roleIds }, ctx) => {
  const { Users } = await ctx.mongo.collections
  const { findRoles } = ctx.mongo.dataFinders

  // The sysadmin role can only be configured at application start time
  const sysadminId = (await findRoles({ name: sysadmin.name }))[0]._id
  roleIds = roleIds.filter(id => id !== sysadminId.toString)

  const user = await Users.findOneAndUpdate(
    { _id: ObjectId(userId) },
    {
      $set: {
        roles: roleIds.map(id => ObjectId(id))
      }
    },
    {
      upsert: false,
      returnDocument: 'after'
    }
  )

  return user.value
}
