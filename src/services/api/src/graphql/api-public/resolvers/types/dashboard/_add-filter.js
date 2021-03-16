import mongo from 'mongodb'
const { ObjectID } = mongo

export default async ({ _id: selfId, filters = [] }, { id: filterId }, ctx) => {
  await ctx.user.ensureDataScientist(ctx)
  const { Filters, Dashboards } = await ctx.mongo.collections
  filterId = ObjectID(filterId)

  if (!Boolean(await Filters.countDocuments({ _id: filterId }))) {
    throw new Error('Unable to find the chart specified. Does it exist')
  }

  if (filters.map(filterId => filterId.toString()).includes(filterId.toString())) {
    throw new Error('Cannot add duplicate filter to dashboard')
  }

  const response = await Dashboards.findOneAndUpdate(
    { _id: selfId },
    {
      $set: {
        filters: [...filters, filterId],
        modifiedAt: new Date(),
      },
    },
    {
      returnOriginal: false,
      upsert: false,
    }
  )

  return response.value
}
