export default ({ field, value, boost = undefined, context = undefined }) => {
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
}
