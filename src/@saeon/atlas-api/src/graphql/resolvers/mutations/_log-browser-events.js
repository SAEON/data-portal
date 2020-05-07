export default async (self, args, ctx) => {
  const { BrowserEvents } = await ctx.mongo.collections
  const { input } = args
  const { insertedCount } = await BrowserEvents.insertMany(input)

  const result = []
  for (let i = 0; i < insertedCount; i++) {
    result.push(true)
  }
  return result
}
