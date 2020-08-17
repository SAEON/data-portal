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
      startCursor: { id: _firstResult?._id || undefined, score: _firstResult?._score || undefined },
      endCursor: { id: _lastResult?._id || undefined, score: _lastResult?._score || undefined },
      hasPreviousPage: undefined,
    }
  },
  totalCount: async self => self.totalCount,
}
