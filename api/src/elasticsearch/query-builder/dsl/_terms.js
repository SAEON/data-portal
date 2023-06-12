import range from './_range.js'

export default terms => {
  return terms
    .filter(({ field, value }) => {
      switch (field) {
        case 'publicationYear':
          return Boolean(parseInt(value), 10)
        default:
          return true
      }
    })
    .map(term => range(term))
}
