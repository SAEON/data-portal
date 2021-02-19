import { CATALOGUE_SUPPORTED_DATABOOK_FORMATS } from '../../../../../../config'

export default (id, records, cache) => {
  if (cache.hasOwnProperty(id)) {
    return cache[id]
  } else {
    for (let node of records.nodes) {
      var { metadata } = node
      var { _source } = metadata
      var { immutableResource, id: itemId } = _source

      if (!itemId) return false

      cache[itemId] = CATALOGUE_SUPPORTED_DATABOOK_FORMATS.includes(immutableResource?._fileFormat)

      if (id === itemId) {
        return cache[id]
      }
    }
  }
}
