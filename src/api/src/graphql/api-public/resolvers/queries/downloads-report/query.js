import convertFieldToSelector from './convert-field-to-selector.js'

const REQUESTED_FIELD_TO_MONGO_FIELD = {
  /**
   * When "clientIpLocation" is requested,
   * the "clientIpAddress" is retrieved from
   * the database and that value is passed to
   * and API to resolve the location. See the
   * "DownloadSummary" type resolver definition
   */
  clientIpLocation: 'clientIpAddress',
}

export default selectionSet => {
  // eslint-disable-next-line
  const { count, ...dimensions } = Object.fromEntries(
    selectionSet.map(({ name: { value: fieldName }, args }) => {
      fieldName = REQUESTED_FIELD_TO_MONGO_FIELD[fieldName] || fieldName
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
  ].filter(_ => _)
}
