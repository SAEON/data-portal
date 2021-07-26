export default async (self, args, ctx) => {
  const { _id: databookId } = self
  const { findFilters } = ctx.mongo.dataFinders
  return await findFilters({ databookId })
}
