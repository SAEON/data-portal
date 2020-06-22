export default async (self, args, ctx) => {
  const { findBrowserEvents } = ctx.mongo.dataLoaders
  return await findBrowserEvents({})
}
