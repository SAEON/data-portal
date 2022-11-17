import hash from 'object-hash'

export default async (self, args, ctx) => {
  const { filter = {}, createdBy, type = 'public' } = args
  const { Lists } = await ctx.mongo.collections

  const result = await Lists.findOneAndUpdate(
    {
      hashOfFilter: hash(filter),
    },
    {
      $setOnInsert: {
        hashOfFilter: hash(filter),
        filter,
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
