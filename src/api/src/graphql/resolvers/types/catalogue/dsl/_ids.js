export default ids => ({
  terms: {
    'id.raw': ids,
    boost: 100
  }
})
