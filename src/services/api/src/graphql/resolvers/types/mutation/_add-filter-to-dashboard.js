import mongo from 'mongodb'
const { ObjectID } = mongo
/**
 * Check the filter and dashboard exists, if so
 * add the filter to the dashboard.layout field.
 * This field is an array of objects that can
 * describe GridStack.js widgets
 */
export default async (_, { filterId, dashboardId }, ctx) => {
  const { Filters, Dashboards } = await ctx.mongo.collections
  filterId = ObjectID(filterId)

  const filterExists = Boolean(await Filters.countDocuments({ _id: filterId }))
  const dashboard = await Dashboards.findOne({ _id: ObjectID(dashboardId) })

  if (!filterExists || !dashboard) {
    throw new Error(
      'Unable to find either the filter or the dashboard specified. Both must already exist'
    )
  }

  const filters = dashboard.filters || []
  console.log('filters', filters)
  if (
    filters
      .map(filter => {
        console.log('map filter', filter)
        const { _id } = filter
        console.log('map _id', _id)
        return _id.toString()
      })
      .includes(filterId.toString())
  ) {
    throw new Error('Cannot add duplicate filter to dashboard')
  }

  const filter = await Filters.findOne({ _id: filterId })
  console.log('findOne filter', filter)
  const newFilters = [...filters, filter]
  console.log('newFilters', newFilters)
  await Dashboards.findOneAndUpdate(
    { _id: ObjectID(dashboardId) },
    {
      $set: {
        filters: newFilters,
        modifiedAt: new Date(),
      },
    }
  )

  console.log('this dashboard', dashboard)
  return await Filters.findOne({ _id: filterId })
}
