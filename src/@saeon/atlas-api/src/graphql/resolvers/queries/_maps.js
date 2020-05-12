export default async (self, args, ctx) => {
  const { findMaps } = ctx.mongo.dataLoaders
  return await findMaps({})
}
