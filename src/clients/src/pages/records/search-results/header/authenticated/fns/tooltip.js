/**
 * Get a tooltip string for the Atlas
 */

export default (selectAll, validCount, selectedIds, cache, max, name) => {
  if (selectAll) {
    if (validCount > max) {
      return `Too many records selected for ${name} - search returns ${validCount} records. Max. ${max}`
    } else {
      return `Configure ${name} from ${
        selectedIds?.filter(id => cache[id]).length || validCount
      } search results`
    }
  } else {
    if (selectedIds.length) {
      const n = selectedIds?.filter(id => cache[id]).length
      if (n) {
        return `Configure ${name} from ${n} records`
      } else {
        return `No ${name}-compatible records found`
      }
    } else {
      return 'No selected records'
    }
  }
}
