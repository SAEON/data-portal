export default {
  edges: async self => {
    const { data } = self
    return data.map(edge => Object.assign(edge, { _type: 'CatalogueEdge' }))
  },
  nodes: async self => {
    const { data } = self
    return data.map(node => Object.assign(node, { _type: 'CatalogueRecord' }))
  },
  pageInfo: async self => self,
  totalCount: async self => self.totalCount,
}
