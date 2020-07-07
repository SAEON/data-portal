export default {
  __resolveType: async connection => {
    return connection._type
  },
}
