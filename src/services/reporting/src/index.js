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
})

while (!iterator.done) {
  const { data } = iterator
  const results = data.repository.ref.target.history.edges
    .map(({ node }) => node)
    .filter(({ message }) => Boolean(message.match(/#\d*/)))
    .map(row =>
      Object.assign(row, {
        'issue#': [...new Set(row.message.match(/#\d*/g))].join(','),
      })
    )

  writeToFile(results)
  setIncludeHeaderRow(false)
  console.log(`${results.length} commits found (with issue refs) and written to output`)
  iterator = await iterator.next()
}
