/**
 * Each Databook can have a maximum of 1 Dashboard
 * If a Dashboard doesn't exist already, create it
 */
export default async (self, args, ctx) => {
  const { _id } = self.doc
  const { Dashboards } = await ctx.mongo.collections

  return (
    (await Dashboards.findOne({ databookId: _id })) ||
    (await Dashboards.insertOne({ databookId: _id })).ops[0]
  )
}
