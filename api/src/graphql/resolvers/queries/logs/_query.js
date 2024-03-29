import convertFieldToSelector from './_convert-field-to-selector.js'

const _sortDirection = {
  ASC: 1,
  DESC: -1,
}

export default ({
  selectionSet,
  variableValues,
  sort: { dimension: sortBy, direction },
  $match,
  $limit,
}) => {
  const sortDirection = _sortDirection[direction]

  const { count, ...dimensions } = Object.fromEntries(
    selectionSet.map(({ name: { value: fieldName }, args }) => [
      fieldName,
      convertFieldToSelector[fieldName]?.({ args, variableValues }),
    ])
  )

  return [
    $match,
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
    { $sort: { [sortBy]: sortDirection } },
    $limit,
  ].filter(_ => _)
}
