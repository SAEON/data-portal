export default async (self, args, ctx) => {
  const { Lists } = await ctx.mongo.collections
  const lists = Lists.find({ type: 'curated' }).sort({ title: 1 })
  return await lists.toArray()
}