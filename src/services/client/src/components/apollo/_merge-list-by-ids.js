/**
 * This assumes that keys missing from incoming
 * list are to be deleted from the cache. This just
 * means that queries for individual dashboards will
 * need manual cache-updating functions. Currently
 * that is not a hassle, but could be in the future
 */
export default (existing, incoming, { readField, mergeObjects }) => {
  const merged = []
  const idMap = Object.create(null)
  if (existing) {
    existing.forEach((obj, i) => {
      idMap[readField('id', obj)] = i
    })
  }
  incoming.forEach(obj => {
    const id = readField('id', obj)
    const i = idMap[id]
    if (typeof i === 'number') {
      merged.push(mergeObjects(existing[i], obj))
    } else {
      merged.push(obj)
    }
  })
  return merged
}
