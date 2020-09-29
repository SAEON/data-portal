import fetch from 'node-fetch'
import apolloHttpLink from 'apollo-link-http'
import apolloClient from 'apollo-client'
import apolloCache from 'apollo-cache-inmemory'
import createExecutor from './_create-executor.js'
import createIterator from './_create-iterator.js'
import query from './_query.js'
import jsBase64 from 'js-base64'
import { DATACITE_USERNAME, DATACITE_PASSWORD } from '../config.js'

const { encode } = jsBase64

const { createHttpLink } = apolloHttpLink
const { InMemoryCache } = apolloCache
const { ApolloClient } = apolloClient

const DATACITE_GQL_ENDPOINT = 'https://api.datacite.org/graphql'

let iterator = await createIterator({
  executor: createExecutor(
    new ApolloClient({
      link: createHttpLink({ uri: DATACITE_GQL_ENDPOINT, fetch }),
      cache: new InMemoryCache(),
    })
  ),
  query,
  pageInfoPath: 'repository.datasets.pageInfo',
  dataPath: 'repository.datasets.edges',
})

while (!iterator.done) {
  const dois = iterator.data.reduce((acc, { node }) => [...acc, node.doi], [])

  /**
   * For every DOI register the URL
   * https://support.datacite.org/docs/mds-api-guide#register-the-url
   */
  const result = await Promise.allSettled(
    dois.map(doi =>
      fetch(`https://mds.datacite.org/doi/${doi}`, {
        method: 'GET',
        headers: {
          Authorization: `Basic ${encode(`${DATACITE_USERNAME}:${DATACITE_PASSWORD}`)}`,
        },
      }).then(res => res.text())
    )
  )

  console.log(dois, result)

  iterator = await iterator.next()
}
