import { ObjectId } from 'mongodb'

/**
 * Each Databook can have a maximum of 1 Dashboard
 * If a Dashboard doesn't exist already, create it
 */
export default async (self, args, ctx) => {
  const { _id: databookId } = self
  const { Dashboards } = await ctx.mongo.collections
  const dashboards = await (await Dashboards.find({ databookId })).toArray()
  return dashboards.length
    ? dashboards
    : [
        (
          await Dashboards.findOneAndUpdate(
            { _id: ObjectId() },
            { $setOnInsert: { databookId } },
            {
              upsert: true,
              returnDocument: 'after',
            }
          )
        ).value,
      ]
}
