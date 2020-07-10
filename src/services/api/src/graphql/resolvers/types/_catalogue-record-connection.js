export default {
  edges: async self => {
    const { data } = self
    return data
  },
  nodes: async self => {
    const { data } = self
    return data
  },
  pageInfo: async self => {
    const { _firstResult, _lastResult } = self
    return {
      hasNextPage: undefined,
      startCursor: _firstResult._id,
      endCursor: _lastResult._id,
      hasPreviousPage: undefined,
    }
  },
  totalCount: async self => self.totalCount,
}
