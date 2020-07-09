export default {
  edges: async self => {
    const { data } = self
    return data.map(edge => Object.assign(edge, { _type: 'CatalogueRecordEdge' }))
  },
  nodes: async self => {
    const { data } = self
    return data.map(node => Object.assign(node, { _type: 'CatalogueRecord' }))
  },
  pageInfo: async self => {
    const { _size, _resultSize, _firstResult, _lastResult, _catalogueStart } = self
    return {
      hasNextPage: !(_resultSize < _size),
      startCursor: _firstResult._id,
      endCursor: _lastResult._id,
      hasPreviousPage: _firstResult._id > _catalogueStart,
    }
  },
  totalCount: async self => self.totalCount,
}
