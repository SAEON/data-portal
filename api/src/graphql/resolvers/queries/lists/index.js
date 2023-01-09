export default async (self, { filter: $search }, ctx) => {
  const filter = $search ? { $text: { $search, $caseSensitive: false } } : {}
  const { Lists } = await ctx.mongo.collections
  const lists = Lists.find({ type: 'curated', ...filter }).sort({
    title: 1,
  })
  return await lists.toArray()
}
