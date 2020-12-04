import mongo from 'mongodb'
const { ObjectID } = mongo

/**
 * Check the chart and dashsboard exists, if so
 * add the chart to the dashboard
 */
export default async (_, { chartId, dashboardId }, ctx) => {
  const { Charts, Dashboards } = await ctx.mongo.collections

  const chartExists = Boolean(await Charts.countDocuments({ _id: ObjectID(chartId) }))
  const dashboard = await Dashboards.findOne({ _id: ObjectID(dashboardId) })

  if (!chartExists || !dashboard) {
    throw new Error(
      'Unable to find either the chart or the dashboard specified. Both must already exist'
    )
  }

  const { charts = [] } = dashboard

  if (charts.includes(chartId)) {
    throw new Error('Cannot add duplicate chart to dashboard')
  }

  const newCharts = [...charts, chartId]

  await Dashboards.findOneAndUpdate(
    { _id: ObjectID(dashboardId) },
    {
      $set: {
        charts: newCharts,
        modifiedAt: new Date(),
      },
    }
  )

  return await Charts.findOne({ _id: ObjectID(chartId) })
}
