import mongo from 'mongodb'
const { ObjectID } = mongo

export default async (_, args, ctx) => {
  await ctx.userModel.checkRole(ctx, 'datascientist')

  const { Dashboards } = await ctx.mongo.collections
  const { title, subtitle, description, databookId } = args

  return (
    await Dashboards.insertOne({
      databookId: ObjectID(databookId),
      modifiedAt: new Date(),
      title,
      subtitle,
      description,
    })
  ).ops[0]
}
