import { CATALOGUE_CLIENT_MAX_DATABOOK_TABLES } from '../../../../../../config'

export default (selectAll, validCount, selectedIds, cache) => {
  if (selectAll) {
    if (validCount > CATALOGUE_CLIENT_MAX_DATABOOK_TABLES) {
      return `Too many records for creating a databook - search returns ${validCount} records. Max. ${CATALOGUE_CLIENT_MAX_DATABOOK_TABLES}`
    } else {
      return `Configure databook from ${
        selectedIds?.filter(id => cache[id]).length || validCount
      } search results`
    }
  } else {
    if (selectedIds.length) {
      const n = selectedIds?.filter(id => cache[id]).length
      if (n) {
        return `Configure databook from ${n} search results`
      } else {
        return 'No databook-compatible records found for selected records'
      }
    } else {
      return 'No selected records'
    }
  }
}
