export default {
  cursor: async self => {
    return self.id // TODO I need the ID from the elasticsearch results
  },
  node: async self => {
    return Object.assign(self, {
      _type: 'CatalogueRecord',
    })
  },
}
