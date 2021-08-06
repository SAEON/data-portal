import { ObjectId } from 'mongodb'

export default async (_, args, ctx) => {
  const { Charts } = await ctx.mongo.collections

  //STEVEN: making sure to not overwrite layout(or any other property) when setting new values.
  //There may be a better shorthand for this
  const updates = {}
  if (args.hasOwnProperty('title')) updates.title = args.title
  if (args.hasOwnProperty('description')) updates.description = args.description
  if (args.hasOwnProperty('setOption')) updates.setOption = args.setOption

  const chart = await Charts.findOneAndUpdate(
    { _id: ObjectId(args.id) },
    {
      $set: updates,
    },
    {
      upsert: false,
      returnDocument: 'after',
    }
  )

  return chart.value
}
