import mongo from 'mongodb'
const { ObjectID } = mongo

/**
 * Check the chart and dashsboard exists, if so
 * remove the chart from the dashboard
 */
export default async (_, { chartId, dashboardId }, ctx) => {
  await ctx.userModel.ensureDataScientist(ctx)

  const { Charts, Dashboards } = await ctx.mongo.collections
  chartId = ObjectID(chartId)

  const chartExists = Boolean(await Charts.countDocuments({ _id: chartId }))
  const dashboard = await Dashboards.findOne({ _id: ObjectID(dashboardId) })

  if (!chartExists || !dashboard) {
    throw new Error('Unable to find either the chart or the dashboard specified. Both must exist')
  }

  const layout = dashboard.layout || []

  if (!layout.map(({ content }) => content.id.toString()).includes(chartId.toString())) {
    throw new Error('Chart is not associated with this dashboard')
  }

  const newLayout = [...layout].filter(
    ({ content }) => content.id.toString() !== chartId.toString()
  )

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
