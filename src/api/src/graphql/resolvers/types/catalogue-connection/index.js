export default {
  edges: async self => {
    const { hits } = self
    return hits
  },
  nodes: async self => {
    const { hits } = self
    return hits
  },
  pageInfo: async self => {
    const { _firstResult, _lastResult, hasPreviousPage, hasNextPage } = self
    const startCursor = {
      id: _firstResult?._id || undefined,
      score: _firstResult?._score || undefined,
    }
    const endCursor = {
      id: _lastResult?._id || undefined,
      score: _lastResult?._score || undefined,
    }

    return {
      hasPreviousPage,
      hasNextPage,
      startCursor: Buffer.from(JSON.stringify(startCursor), 'utf8').toString('base64'),
      endCursor: Buffer.from(JSON.stringify(endCursor), 'utf8').toString('base64'),
    }
  },
  totalCount: async self => self.totalCount,
}
