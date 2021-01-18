import mongo from 'mongodb'
const { ObjectID } = mongo
/**
 * Check the filter and dashboard exists, if so
 * add the filter to the dashboard.layout field.
 * This field is an array of objects that can
 * describe GridStack.js widgets
 */
export default async (_, { filterId, dashboardId }, ctx) => {
  await ctx.userModel.checkRole(ctx, 'datascientist')

  const { Filters, Dashboards } = await ctx.mongo.collections
  filterId = ObjectID(filterId)

  const filterExists = Boolean(await Filters.countDocuments({ _id: filterId }))
  const dashboard = await Dashboards.findOne({ _id: ObjectID(dashboardId) })
  if (!filterExists || !dashboard) {
    throw new Error(
      'Unable to find either the filter or the dashboard specified. Both must already exist'
    )
  }

  const dashboardFilters = dashboard.filters || []

  if (
    dashboardFilters
      .map(filterId => {
        return filterId.toString()
      })
      .includes(filterId.toString())
  ) {
    throw new Error('Cannot add duplicate filter to dashboard')
  }

  await Dashboards.findOneAndUpdate(
    { _id: ObjectID(dashboardId) },
    {
      $set: {
        filters: [...dashboardFilters, filterId],
        modifiedAt: new Date(),
      },
    }
  )

  return await Filters.findOne({ _id: filterId })
}
