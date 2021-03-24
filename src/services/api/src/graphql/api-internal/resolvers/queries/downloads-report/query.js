/**
 * Convert fields specified as
 * GraphQL fields to Mongo
 * selectors
 */
const FIELD_TO_SELECTOR = {
  id: { $ifNull: ['$info.doi', '$info.odpId'] },
  clientSession: '$clientSession',
  clientIpAddress: '$clientInfo.ipAddress',
  clientIpLocation: '$clientInfo.ipAddress',
  clientUserAgent: '$clientInfo.userAgent',
  clientPathname: '$info.pathname',
  date: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
}

/**
 * Sometimes the fields specified as
 * GraphQL fields don't correlate to
 * fields in Mongo docs. Rename these
 */
const FIELD_TO_FIELD = {
  clientIpLocation: 'clientIpAddress',
}

export default selectionSet => {
  // eslint-disable-next-line
  const { count, ...dimensions } = Object.fromEntries(
    selectionSet.map(field => {
      field = FIELD_TO_FIELD[field] || field
      return [field, FIELD_TO_SELECTOR[field]]
    })
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
