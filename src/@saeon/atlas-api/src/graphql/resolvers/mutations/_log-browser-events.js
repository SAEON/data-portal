export default async (self, args, ctx) => {
  const { input } = args
  const { BrowserEvents } = await ctx.mongo.collections

  const { insertedCount } = await BrowserEvents.insertMany(
    input.map((eventDoc) => Object.assign({ type: 'BrowserEvent' }, eventDoc))
  )

  const result = []
  for (let i = 0; i < insertedCount; i++) {
    result.push(true)
  }
  return result
}
