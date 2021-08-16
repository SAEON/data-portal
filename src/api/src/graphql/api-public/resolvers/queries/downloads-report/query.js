import convertFieldToSelector from './convert-field-to-selector.js'

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
    selectionSet.map(({ name: { value: fieldName }, args }) => {
      fieldName = FIELD_TO_FIELD[fieldName] || fieldName
      return [fieldName, convertFieldToSelector[fieldName]?.(args)]
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
