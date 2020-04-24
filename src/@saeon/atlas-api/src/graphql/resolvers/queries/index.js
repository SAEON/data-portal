import pubsub, { TEST_PUBSUB } from '../pubsub'

export default {
  hello: () => {
    pubsub.publish(TEST_PUBSUB, { test: 'hi' })
    return 'hello from query'
  },
}
