/**
 * I think that this is the default Apollo logic for merging list fields onto types,
 * however it's worth having here explicitly in case this changes / as a reference on
 * how to merge lists in custom ways
 *
 * NOTE
 *
 * It might be tempting to delete items from the cache using cache.writeQuery,
 * but this doesn't work. This merge function will only add information to existing
 * items in the Apollo cache. There are many possibilities where a query returns a
 * partial list of data that DOESN'T mean that missing items compared to the existing
 * cache should be deleted
 *
 * Instead use cache.evict({ id: `<Type>:<ID>` })
 */
export default (existing, incoming, { readField, mergeObjects }) => {
  const merged = existing ? existing.slice(0) : []
  const idMap = Object.create(null)

  if (existing) {
    existing.forEach((obj, i) => {
      idMap[readField('id', obj)] = i
    })
  }

  if (incoming) {
    incoming.forEach(obj => {
      const id = readField('id', obj)
      const i = idMap[id]
      if (typeof i === 'number') {
        merged[i] = mergeObjects(merged[i], obj)
      } else {
        idMap[id] = merged.length
        merged.push(obj)
      }
    })
  }

  return merged
}
