import mongo from 'mongodb'
const { ObjectID } = mongo

export default async (_, { id }, ctx) => {
  await ctx.userModel.ensureDataScientist(ctx)

  const { Charts } = await ctx.mongo.collections
  const { result } = await Charts.remove({ _id: ObjectID(id) })
  const { n } = result

  if (!n) {
    throw new Error(`No chart deleted. Are you sure that chart id = ${id} exists?`)
  }

  return true
}
