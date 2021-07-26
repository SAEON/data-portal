import { ObjectId } from 'mongodb'

export default async (databook, args, ctx) => {
  await ctx.user.ensureDataScientist(ctx)

  const { Filters } = await ctx.mongo.collections
  const { databookId, ..._args } = args

  return (
    await Filters.insertOne({
      databookId: ObjectId(databookId),
      modifiedAt: new Date(),
      ..._args,
    })
  ).ops[0]
}
