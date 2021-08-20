import convertFieldToSelector from './convert-field-to-selector.js'

export default selectionSet => {
  // eslint-disable-next-line
  const { count, ...dimensions } = Object.fromEntries(
    selectionSet.map(({ name: { value: fieldName }, args }) => [
      fieldName,
      convertFieldToSelector[fieldName]?.(args),
    ])
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
