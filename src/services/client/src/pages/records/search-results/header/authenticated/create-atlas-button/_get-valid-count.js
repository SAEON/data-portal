import isValid from './_is-valid'

export default (selectedIds, selectAll, catalogue, cache) => {
  let validCount = 0

  if (selectedIds?.length) {
    validCount = selectedIds.filter(id => isValid(id, catalogue?.records, cache)).length
  }

  if (selectAll) {
    validCount =
      catalogue?.summary
        .find(summary => summary['_linked-resources-filter'])
        ?.['_linked-resources-filter'].find(({ key }) => key?.toUpperCase() === 'QUERY')
        ?.doc_count || 0
  }

  return validCount
}
