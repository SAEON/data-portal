import mongo from 'mongodb'
const { ObjectID } = mongo

export default async (_, { id, layout }, ctx) => {
  await ctx.userModel.ensureDataScientist(ctx)

  const { Dashboards } = await ctx.mongo.collections
  const { value } = await Dashboards.findOneAndUpdate(
    { _id: ObjectID(id) },
    {
      $set: {
        layout,
      },
    },
    {
      returnNewDocument: true,
      upsert: false,
    }
  )
  return value
}
