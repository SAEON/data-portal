import { ObjectId } from 'mongodb'

export default async (_, args, ctx) => {
  const { Dashboards } = await ctx.mongo.collections
  const { title, subtitle, description, databookId } = args

  const result = await Dashboards.findOneAndUpdate(
    {
      _id: ObjectId(),
    },
    {
      $set: {
        databookId: ObjectId(databookId),
        modifiedAt: new Date(),
        title,
        subtitle,
        description,
      },
    },
    {
      upsert: true,
      returnDocument: 'after',
    }
  )

  return result.value
}
