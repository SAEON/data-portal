export default async ({ _id: selfId, filters = [] }, { id: filterId }, ctx) => {
  await ctx.user.ensureDataScientist(ctx)
  const { Dashboards } = await ctx.mongo.collections

  const response = await Dashboards.findOneAndUpdate(
    {
      _id: selfId,
    },
    {
      $set: {
        filters: filters.filter(id => id.toString() !== filterId),
      },
    },
    {
      returnDocument: 'after',
      upsert: false,
    }
  )

  return response.value
}
