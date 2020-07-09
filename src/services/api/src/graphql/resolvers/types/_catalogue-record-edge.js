export default {
  cursor: async self => {
    return self._id
  },
  node: async self => {
    return Object.assign(self, {
      _type: 'CatalogueRecord',
    })
  },
}
