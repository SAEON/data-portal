export default {
  __resolveType: async edge => {
    return edge._type
  },
}
