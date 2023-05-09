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
    .map(({ field, value, boost = undefined, context = undefined }) => {
      switch (context) {
        case 'from':
          return {
            range: {
              [field]: {
                gte: value,
                boost,
              },
            },
          }
        case 'to':
          return {
            range: {
              [field]: {
                lte: value,
                boost,
              },
            },
          }
        default:
          return {
            term: {
              [field]: {
                value,
                boost,
              },
            },
          }
      }
    })
}
