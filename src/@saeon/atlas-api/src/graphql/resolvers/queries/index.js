import pubsub, { ON_FILTER_CHANGE } from '../pubsub'
import fetch from 'node-fetch'

export default {
  // eslint-disable-next-line no-unused-vars
  search: async (self, args, ctx) => {
    const { dsl } = args

    const uri = `${'http://192.168.116.66:9200'}/${'saeon-odp-4-2'}/_search`
    const response = await fetch(uri, {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dsl),
    })
    const result = await response.json()

    pubsub.publish(ON_FILTER_CHANGE, { onFilterChange: { data: result?.hits?.hits } })
    return { data: result?.hits?.hits }
  },
}
