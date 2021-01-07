import mongo from 'mongodb'
const { ObjectID } = mongo

/**
 * Check the filter and dashsboard exists, if so
 * remove the filter from the dashboard
 */
export default async (_, { filterId, dashboardId }, ctx) => {
  const { Filters, Dashboards } = await ctx.mongo.collections
  filterId = ObjectID(filterId)

  const filterExists = Boolean(await Filters.countDocuments({ _id: filterId }))
  const dashboard = await Dashboards.findOne({ _id: ObjectID(dashboardId) })

  if (!filterExists || !dashboard) {
    throw new Error('Unable to find either the filter or the dashboard specified. Both must exist')
  }

  const layout = dashboard.layout || []

  if (!layout.map(({ content }) => content.id.toString()).includes(filterId.toString())) {
    throw new Error('Filter is not associated with this dashboard')
  }

  const newLayout = [...layout].filter(
    ({ content }) => content.id.toString() !== filterId.toString()
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

  return await Filters.findOne({ _id: filterId })
}
