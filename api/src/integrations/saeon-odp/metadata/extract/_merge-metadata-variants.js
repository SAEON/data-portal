export default (...records) => {
  const merge = records.reduce((merge, record) => {
    Object.entries(record).forEach(([key, value]) => {
      if (merge.hasOwnProperty(key) && merge[key] !== value && merge[key]) {
        if (JSON.stringify(merge[key]) !== JSON.stringify(value)) {
          if (typeof merge[key] === 'string' || typeof value == 'string') {
            merge[key] = [merge[key], value]
            return
          }

          if (merge[key].constructor === Array) {
            if (value.constructor === Array) {
              merge[key] = [...merge[key], ...value]
            } else {
              merge[key] = [...merge[key], value]
            }
            return
          }

          if (merge[key].constructor === Object && value.constructor === Object) {
            merge[key] = { ...merge[key], ...value }
            return
          }

          throw new Error('Error merging metadata variants for record', merge.id || 'Unknown ID')
        }
      } else {
        merge[key] = value
      }
    })

    return merge
  }, {})

  return merge
}
