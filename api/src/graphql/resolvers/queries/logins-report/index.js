export default async (self, args, ctx) => {
  const { Logs } = await ctx.mongo.collections

  const result = await Logs.find({ type: 'authentication' })

  return {
    authentication: await result.toArray(),
  }
}
