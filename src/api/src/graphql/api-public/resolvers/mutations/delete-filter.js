import { ObjectId } from 'mongodb'

export default async (_, { id }, ctx) => {
  await ctx.user.ensureDataScientist(ctx)

  const { Filters } = await ctx.mongo.collections
  const { result } = await Filters.remove({ _id: ObjectId(id) })
  const { n } = result

  if (!n) {
    throw new Error(`No filter deleted. Are you sure that filter id = ${id} exists?`)
  }

  return true
}
