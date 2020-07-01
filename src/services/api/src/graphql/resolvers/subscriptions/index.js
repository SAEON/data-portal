import pubsub, { ON_FILTER_CHANGE } from '../pubsub'

export default {
  onFilterChange: {
    subscribe: () => {
      return pubsub.asyncIterator([ON_FILTER_CHANGE])
    },
  },
}
