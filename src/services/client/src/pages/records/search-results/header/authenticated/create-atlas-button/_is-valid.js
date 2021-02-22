export default (id, records, cache) => {
  if (cache.hasOwnProperty(id)) {
    return cache[id]
  } else {
    for (let node of records.nodes) {
      var { metadata } = node
      var { _source } = metadata
      var { linkedResources, id: itemId } = _source

      if (!itemId) return false

      cache[itemId] = Boolean(
        linkedResources?.find(
          ({ linkedResourceType }) => linkedResourceType?.toUpperCase() === 'QUERY'
        )
      )

      if (id === itemId) {
        return cache[id]
      }
    }
  }
}
