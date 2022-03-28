import { ObjectId } from 'mongodb'
import userModel from '../../../../user-model/index.js'
import PERMISSIONS from '../../../../user-model/permissions.js'

export default async (self, args, ctx) => {
  await userModel.ensurePermission({ ctx, permission: PERMISSIONS['list:update'] })
  const { id, search, createdBy, ...otherFields } = args
  const { Lists } = await ctx.mongo.collections

  const _id = ObjectId()

  const result = await Lists.findOneAndUpdate(
    {
      _id: id ? ObjectId(id) : _id
    },
    {
      $setOnInsert: {
        _id,
        createdAt: new Date()
      },
      $set: {
        modifiedAt: new Date(),
        search,
        createdBy,
        ...otherFields
      }
    },
    {
      upsert: true,
      returnDocument: 'after'
    }
  )

  return result.value
}
