import mongo from 'mongodb'
const { ObjectID } = mongo

export default async ({ _id: selfId, layout = [] }, { id: chartId }, ctx) => {
  await ctx.user.ensureDataScientist(ctx)
  const { Charts, Dashboards } = await ctx.mongo.collections
  chartId = ObjectID(chartId)

  if (!Boolean(await Charts.countDocuments({ _id: chartId }))) {
    throw new Error('Unable to find the chart specified. Does it exist')
  }

  console.log('hi')

  if (layout.map(({ content }) => content.id.toString()).includes(chartId.toString())) {
    throw new Error('Cannot add duplicate chart to dashboard')
  }

  const response = await Dashboards.findOneAndUpdate(
    { _id: selfId },
    {
      $set: {
        layout: [...layout, { content: { id: chartId, type: 'Chart' } }],
        modifiedAt: new Date(),
      },
    },
    {
      returnOriginal: false,
      upsert: false,
    }
  )

  console.log('hi', response)

  return response.value
}
