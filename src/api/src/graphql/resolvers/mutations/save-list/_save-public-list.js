import hash from 'object-hash'

export default async (self, args, ctx) => {
  const { search, createdBy, type = 'public' } = args
  const { Lists } = await ctx.mongo.collections

  const result = await Lists.findOneAndUpdate(
    {
      hashedSearch: hash(search),
    },
    {
      $setOnInsert: {
        hashedSearch: hash(search),
        search,
        createdAt: new Date(),
        createdBy,
        type,
      },
    },
    {
      upsert: true,
      returnDocument: 'after',
    }
  )

  return result.value
}
