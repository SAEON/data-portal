import mongo from 'mongodb'
const { ObjectID } = mongo

export default async (_, { id }, ctx) => {
  await ctx.userModel.ensureDataScientist(ctx)

  const { Filters } = await ctx.mongo.collections
  const { result } = await Filters.remove({ _id: ObjectID(id) })
  const { n } = result

  if (!n) {
    throw new Error(`No filter deleted. Are you sure that filter id = ${id} exists?`)
  }

  return true
}
