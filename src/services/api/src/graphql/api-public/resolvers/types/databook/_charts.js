export default async (self, args, ctx) => {
  const { _id: databookId } = self.doc
  const { findCharts } = ctx.mongo.dataFinders
  return await findCharts({ databookId })
}
