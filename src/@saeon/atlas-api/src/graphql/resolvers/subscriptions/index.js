import pubsub, { TEST_PUBSUB } from '../pubsub'

export default {
  hello: {
    subscribe: () => {
      return pubsub.asyncIterator([TEST_PUBSUB])
    },
  },
}
