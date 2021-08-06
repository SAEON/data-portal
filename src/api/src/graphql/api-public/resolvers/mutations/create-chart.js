import { ObjectId } from 'mongodb'

export default async (_, args, ctx) => {
  const { Charts } = await ctx.mongo.collections
  const { databookId, ..._args } = args

  return (
    await Charts.insertOne({
      databookId: ObjectId(databookId),
      modifiedAt: new Date(),
      ..._args,
    })
  ).ops[0]
}
