export default async (self, args, ctx) => {
  const { Lists } = await ctx.mongo.collections
  const lists = Lists.find({}).limit(50)
  return await lists.toArray()
}
