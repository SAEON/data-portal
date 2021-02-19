import isValid from './_is-valid'
import { CATALOGUE_SUPPORTED_DATABOOK_FORMATS } from '../../../../../../config'

export default (selectedIds, selectAll, catalogue, cache) => {
  let validCount = 0

  if (selectedIds?.length) {
    validCount = selectedIds.filter(id => isValid(id, catalogue?.records, cache)).length
  }

  if (selectAll) {
    validCount =
      catalogue?.summary
        .find(summary => summary['data-format-filter'])
        ?.['data-format-filter'].find(({ key }) => {
          return CATALOGUE_SUPPORTED_DATABOOK_FORMATS.includes(key.toUpperCase())
        })?.doc_count || 0
  }

  return validCount
}
