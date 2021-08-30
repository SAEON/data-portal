/**
 * This is just an example of how to merge arrays
 * Might be useful for merging on non-id fields.
 *
 * But mostly this should be done automatically.
 *
 * https://www.apollographql.com/docs/react/caching/cache-field-behavior/#merging-arrays-of-non-normalized-objects
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
        idMap[i] = merged.length
        merged.push(obj)
      }
    })
  }

  return merged
}
