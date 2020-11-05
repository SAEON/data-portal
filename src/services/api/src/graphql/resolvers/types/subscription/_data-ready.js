import pubsub, { DATA_READY } from '../../../pubsub.js'

export default {
  subscribe: () => pubsub.asyncIterator([DATA_READY]),
}
