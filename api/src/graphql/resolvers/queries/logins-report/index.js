export default async (self, args, ctx) => {
  const { Logs } = await ctx.mongo.collections

  const result = await Logs.aggregate([
    { $match: { type: 'authentication' } },
    { $sort: { createdAt: -1 } },
    { $limit: 1000 },
    {
      $lookup: {
        from: 'users',
        localField: 'userId',
        pipeline: [
          {
            $lookup: {
              from: 'roles',
              localField: 'roles',
              pipeline: [
                {
                  $lookup: {
                    from: 'permissions',
                    localField: 'permissions',
                    foreignField: '_id',
                    as: 'permissions',
                    pipeline: [{ $project: { name: 1 } }],
                  },
                },
              ],
              foreignField: '_id',
              as: 'roles',
            },
          },
        ],
        foreignField: '_id',
        as: 'user',
      },
    },
    { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },
    {
      $project: {
        userId: 1,
        createdAt: 1,
        'clientInfo.ipLocation': 1,
        'info.maxAgeInHours': 1,
        'user.emailAddress': 1,
        'user.name': 1,
        'user.tokenSet.expires_at': 1,
        'user.roles.name': 1,
        'user.roles.permissions.name': 1,
        'user.roles.permissionss.description': 1,
      },
    },
  ])

  return await result.toArray()
}
