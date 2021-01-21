import mongo from 'mongodb'
const { ObjectID } = mongo

export default async (_, args, ctx) => {
  await ctx.userModel.checkRole(ctx, 'datascientist')
  const { Dashboards } = await ctx.mongo.collections

  //STEVEN: making sure to not overwrite layout(or any other property) when setting new values.
  //There may be a better shorthand for this
  const updates = {}
  if (args.hasOwnProperty('layout')) updates.layout = args.layout
  if (args.hasOwnProperty('title')) updates.title = args.title
  if (args.hasOwnProperty('subtitle')) updates.subtitle = args.subtitle
  if (args.hasOwnProperty('description')) updates.description = args.description

  const oldDashboard = await Dashboards.findOneAndUpdate(
    { _id: ObjectID(args.id) },
    {
      $set: updates,
    }
    // {
    //   returnNewDocument: true,
    //   upsert: false,
    // }
  )
  // const { value } = oldDashboard
  // return value
  //STEVEN: findOneAndUpdate keeps returning the dashboard pre-update value (despite returnNewDocument:true)
  // so I set the return to find the updated value
  return await Dashboards.findOne({ _id: ObjectID(args.id) })
}
