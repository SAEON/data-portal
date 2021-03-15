import mongo from 'mongodb'
const { ObjectID } = mongo

export default async ({ layout }, args, ctx) => {
  const chartIds = layout?.map(({ content }) => content.id)
  const { findCharts } = ctx.mongo.dataFinders
  return await findCharts({ _id: { $in: (chartIds || []).map(id => ObjectID(id)) } })
}
