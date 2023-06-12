import { ObjectId } from 'mongodb'
import userModel from '../../../../user-model/index.js'
import PERMISSIONS from '../../../../user-model/permissions.js'
import { PASSPORT_SSO_SESSION_ID } from '../../../../config/index.js'

export default async (self, args, ctx) => {
  await userModel.ensurePermission({ ctx, permission: PERMISSIONS['list:update'] })
  const { id, filter = {}, createdBy, type, ...otherFields } = args
  const { Lists } = await ctx.mongo.collections

  const _id = new ObjectId()

  const result = await Lists.findOneAndUpdate(
    {
      _id: id ? new ObjectId(id) : _id,
    },
    {
      $setOnInsert: {
        _id,
        createdAt: new Date(),
        type,
        userId: ctx.user.info(ctx)?.id || undefined,
        clientSession: ctx.cookies.get(PASSPORT_SSO_SESSION_ID) || 'no-session', // This can happen if the user blocks cookies
      },
      $set: {
        modifiedAt: new Date(),
        filter,
        createdBy,
        ...otherFields,
      },
    },
    {
      upsert: true,
      returnDocument: 'after',
    }
  )

  return result.value
}
