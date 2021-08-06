export default async ({ _id: selfId, layout = [] }, { id: chartId }, ctx) => {
  await ctx.user.ensureDataScientist(ctx)
  const { Dashboards } = await ctx.mongo.collections

  const response = await Dashboards.findOneAndUpdate(
    {
      _id: selfId,
    },
    {
      $set: {
        layout: layout.filter(
          ({ content }) => content.id.toString() !== chartId && content.type === 'Chart'
        ),
      },
    },
    {
      returnDocument: 'after',
      upsert: false,
    }
  )

  return response.value
}
