export default {
  hasNextPage: async self => {
    const { first = 0, resultCount } = self
    return first >= resultCount // TODO
  },
  hasPreviousPage: async self => {
    const { last = 0, resultCount } = self
    return last >= resultCount // TODO
  },
  startCursor: async self => self.startCursor,
  endCursor: async self => self.endCursor,
}
