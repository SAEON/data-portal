const FIELD_TO_SELECTOR = {
  id: { $ifNull: ['$info.doi', '$info.odpId'] },
  clientSession: '$clientSession',
  clientIpAddress: '$clientInfo.ipAddress',
  clientIpLocation: '$clientInfo.ipAddress',
  clientUserAgent: '$clientInfo.userAgent',
  clientPathname: '$info.pathname',
  // date: '$createdAt',
  date: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
}

export default (selectionSet, { sortBy } = {}) => {
  // eslint-disable-next-line
  const { count, ...dimensions } = Object.fromEntries(
    selectionSet.map(field => [field, FIELD_TO_SELECTOR[field]])
  )

  return [
    {
      $match: {
        type: 'download',
      },
    },
    {
      $group: {
        _id: dimensions,
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
  ]
}
