import pubsub, { ON_FILTER_CHANGE } from '../pubsub'
import fetch from 'node-fetch'
import { Catalogue } from '@saeon/catalogue-search'

const dslAddress = 'http://192.168.116.66:9200'
const index = 'saeon-odp-4-2'

const catalog = new Catalogue({
  dslAddress,
  index,
})

export default {
  // eslint-disable-next-line no-unused-vars
  search: async (self, args, ctx) => {
    const { dsl } = args

    try {
      const response = await catalog.query(dsl)
    } catch (error) {
      console.log(error)
    }

    const result = await response.json()

    pubsub.publish(ON_FILTER_CHANGE, { onFilterChange: { data: result?.hits?.hits } })
    return { data: result?.hits?.hits }
  },
}
