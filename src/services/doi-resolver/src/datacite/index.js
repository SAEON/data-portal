import fetch from 'node-fetch'
import apolloHttpLink from 'apollo-link-http'
import apolloClient from 'apollo-client'
import apolloCache from 'apollo-cache-inmemory'
import createExecutor from './_create-executor.js'
import createIterator from './_create-iterator.js'
import query from './_query.js'

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

// while (!iterator.done) {
//   console.log('hi', iterator.data)

//   /**
//    * The point of this exercise is to pair dois with ids
//    */
//   const data = iterator.data.reduce(
//     (acc, { node }) => [...acc, { doi: node.doi, id: node.url.match(/(?<=\?guid=).*$/)[0] }],
//     []
//   )

//   console.log(data)

//   iterator = await iterator.next()
// }
