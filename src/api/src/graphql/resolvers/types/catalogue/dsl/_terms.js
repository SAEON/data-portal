export default terms => {
  return terms
    .filter(({ field, value }) =>
      field === 'publicationYear' ? Boolean(parseInt(value), 10) : true
    )
    .map(({ field, value, boost = 2.5 }) => ({
      term: {
        [field]: {
          value,
          boost,
        },
      },
    }))
}
