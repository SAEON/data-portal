export default {
  __resolveType: async node => {
    return node._type
  },
}
