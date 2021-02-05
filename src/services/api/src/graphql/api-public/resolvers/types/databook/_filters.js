export default async (self, args, ctx) => {
  const { _id: databookId } = self.doc
  const { findFilters } = ctx.mongo.dataFinders
  return await findFilters({ databookId })
}
