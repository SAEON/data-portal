/**
 * Each Databook can have a maximum of 1 Dashboard
 * If a Dashboard doesn't exist already, create it
 */
export default async (self, args, ctx) => {
  const { _id: databookId } = self.doc
  const { Dashboards } = await ctx.mongo.collections
  const dashboards = await (await Dashboards.find({ databookId })).toArray()
  return dashboards.length ? dashboards : (await Dashboards.insertOne({ databookId })).ops
}
