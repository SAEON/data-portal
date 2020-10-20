import pubsub, { ON_FILTER_CHANGE } from '../../../pubsub.js'

export default {
  subscribe: () => pubsub.asyncIterator([ON_FILTER_CHANGE]),
}
