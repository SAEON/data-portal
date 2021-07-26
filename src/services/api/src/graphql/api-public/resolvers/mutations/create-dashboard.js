import { ObjectId } from 'mongodb'

export default async (_, args, ctx) => {
  await ctx.user.ensureDataScientist(ctx)

  const { Dashboards } = await ctx.mongo.collections
  const { title, subtitle, description, databookId } = args

  return (
    await Dashboards.insertOne({
      databookId: ObjectId(databookId),
      modifiedAt: new Date(),
      title,
      subtitle,
      description,
    })
  ).ops[0]
}
