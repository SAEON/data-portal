export default terms =>
  terms
    .filter(({ field, value }) =>
      field === 'publicationYear' ? Boolean(parseInt(value), 10) : true
    )
    .map(({ field, value, boost = 10 }) => ({
      term: {
        [field]: {
          value,
          boost,
        },
      },
    }))
