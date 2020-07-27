import '@saeon/logger'
import fetch from 'node-fetch'
import apolloHttpLink from 'apollo-link-http'
import apolloClient from 'apollo-client'
import apolloCache from 'apollo-cache-inmemory'
import { createExecutor, commits, createIterator } from './gql/index.js'
import { GQL_ENDPOINT, SINCE } from './config.js'
import createFileWriter from './lib/stream-to-file.js'
const { createHttpLink } = apolloHttpLink
const { InMemoryCache } = apolloCache
const { ApolloClient } = apolloClient

/**
 * The filewriter expects that it will be passed an array of edges
 * as returned from the GitHub GraphQL API
 */
const { writeToFile, setIncludeHeaderRow } = createFileWriter()

console.log('Fetching Git commits since', SINCE)

let iterator = await createIterator({
  executor: createExecutor(
    new ApolloClient({
      link: createHttpLink({ uri: GQL_ENDPOINT, fetch }),
      cache: new InMemoryCache(),
    })
  ),
  query: commits,
  pageInfoPath: 'repository.ref.target.history.pageInfo',
  dataPath: 'repository.ref.target.history.edges',
})

while (!iterator.done) {
  console.log(`Writing ${iterator.data.length} results to file`)
  writeToFile({
    data: iterator.data,
    filterNodes: ({ message }) => Boolean(message.match(/#\d*/)),
    mapProperties: row =>
      Object.assign(row, {
        'issue#': [...new Set(row.message.match(/#\d*/g))].join(','),
      }),
  })
  setIncludeHeaderRow(false)
  iterator = await iterator.next()
}

/**
 * Notify completion
 */
console.log('Complete!')
