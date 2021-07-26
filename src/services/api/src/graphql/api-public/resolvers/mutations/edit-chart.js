import { ObjectId } from 'mongodb'

//update Chart
export default async (_, args, ctx) => {
  console.log('---------------------------IM HERE 1---------------------------')
  // await ctx.user.ensureDataScientist(ctx)
  const { Charts } = await ctx.mongo.collections
  console.log(2)
  //STEVEN: making sure to not overwrite layout(or any other property) when setting new values.
  //There may be a better shorthand for this
  const updates = {}
  if (args.hasOwnProperty('title')) updates.title = args.title
  if (args.hasOwnProperty('description')) updates.description = args.description
  if (args.hasOwnProperty('setOption')) updates.setOption = args.setOption
  console.log(3)
  const oldChart = await Charts.findOneAndUpdate(
    { _id: ObjectId(args.id) },
    {
      $set: updates,
    }
    // {
    //   returnNewDocument: true,
    //   upsert: false,
    // }
  )
  console.log(4)
  // const { value } = oldDashboard
  // return value
  //STEVEN: findOneAndUpdate keeps returning the dashboard pre-update value (despite returnNewDocument:true)
  // so I set the return to find the updated value
  return await Charts.findOne({ _id: ObjectId(args.id) })
}
