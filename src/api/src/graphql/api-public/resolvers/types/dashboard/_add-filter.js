import { ObjectId } from 'mongodb'

export default async ({ _id: selfId, filters = [] }, { id: filterId }, ctx) => {
  const { Filters, Dashboards } = await ctx.mongo.collections
  filterId = ObjectId(filterId)

  if (!(await Filters.countDocuments({ _id: filterId }))) {
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
      returnDocument: 'after',
      upsert: false,
    }
  )

  return response.value
}
