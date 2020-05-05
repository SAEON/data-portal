import pubsub, { ON_FILTER_CHANGE } from '../pubsub'
import fetch from 'node-fetch'
import { Catalogue } from '@saeon/catalogue-search'
import { PROXY_ADDRESS } from '../../../config'

// This is re-requesting a resource through this api
// Is this a good idea?
// TODO - this can actually be sent directly to the proxy
const DSL_INDEX = `saeon-odp-4-2`
const DSL_PROXY = `${PROXY_ADDRESS}/proxy/saeon-elk`
const catalog = new Catalogue({
  dslAddress: DSL_PROXY,
  index: DSL_INDEX,
  httpClient: fetch,
})

// eslint-disable-next-line no-unused-vars
export default async (self, args, ctx) => {
  const { dsl } = args
  const data = await catalog.query(dsl)
  pubsub.publish(ON_FILTER_CHANGE, { onFilterChange: { data } })
  return { data }
}
