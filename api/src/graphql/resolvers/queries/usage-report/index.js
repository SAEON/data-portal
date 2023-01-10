export default async (self, args, ctx) => {
  const { Logs } = await ctx.mongo.collections

  const result = await Logs.aggregate([
    { $match: { type: 'appRender' } },
    {
      $group: {
        _id: {
          clientSession: '$clientSession',
          referrer: '$referrer',
          location: '$clientInfo.ipLocation',
        },
        docCount: { $sum: 1 },
      },
    },
    {
      $addFields: {
        '_id.count': '$docCount',
      },
    },
    {
      $replaceRoot: {
        newRoot: '$_id',
      },
    },
    { $sort: { count: -1 } },
  ])

  return {
    usage: await result.toArray(),
  }
}
