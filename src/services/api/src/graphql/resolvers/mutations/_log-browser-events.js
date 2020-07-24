export default async (self, args, ctx) => {
  const { input } = args
  const { EventLog } = await ctx.mongo.collections

  const { insertedCount } = await EventLog.insertMany(
    input.map(eventDoc =>
      Object.assign({ clientSession: ctx.cookies.get('ClientSession') }, eventDoc)
    )
  )

  const result = []
  for (let i = 0; i < insertedCount; i++) {
    result.push(true)
  }
  return result
}
