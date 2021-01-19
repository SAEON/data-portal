import mongo from 'mongodb'
const { ObjectID } = mongo

/**
 * Check the chart and dashboard exists, if so
 * add the chart to the dashboard.layout field.
 * This field is an array of objects that can
 * describe GridStack.js widgets
 */
export default async (_, { chartId, dashboardId }, ctx) => {
  await ctx.userModel.ensureDataScientist(ctx)

  const { Charts, Dashboards } = await ctx.mongo.collections
  chartId = ObjectID(chartId)

  const chartExists = Boolean(await Charts.countDocuments({ _id: chartId }))
  const dashboard = await Dashboards.findOne({ _id: ObjectID(dashboardId) })

  if (!chartExists || !dashboard) {
    throw new Error(
      'Unable to find either the chart or the dashboard specified. Both must already exist'
    )
  }

  const layout = dashboard.layout || []

  if (layout.map(({ content }) => content.id.toString()).includes(chartId.toString())) {
    throw new Error('Cannot add duplicate chart to dashboard')
  }

  const newLayout = [...layout, { content: { id: chartId, type: 'Chart' } }]

  await Dashboards.findOneAndUpdate(
    { _id: ObjectID(dashboardId) },
    {
      $set: {
        layout: newLayout,
        modifiedAt: new Date(),
      },
    }
  )

  return await Charts.findOne({ _id: chartId })
}
