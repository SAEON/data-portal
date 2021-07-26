import { ObjectId } from 'mongodb'

export default async (_, { id }, ctx) => {
  await ctx.user.ensureDataScientist(ctx)

  const { Charts } = await ctx.mongo.collections
  const { result } = await Charts.remove({ _id: ObjectId(id) })
  const { n } = result

  if (!n) {
    throw new Error(`No chart deleted. Are you sure that chart id = ${id} exists?`)
  }

  return true
}
