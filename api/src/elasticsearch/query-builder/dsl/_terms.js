export default terms => {
  return terms
    .filter(({ field, value }) =>
      field === 'publicationYear' ? Boolean(parseInt(value), 10) : true
    )
    .map(({ field, value, boost = undefined }) => ({
      term: {
        [field]: {
          value,
          boost,
        },
      },
    }))
}
