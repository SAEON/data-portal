import { createHttpLink } from 'apollo-link-http'
import apolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import createExecutor from './_create-executor.js'
import createIterator from './_create-iterator.js'

const { ApolloClient } = apolloClient

export default ({
  fetch = globalThis.fetch,
  gqlEndpoint: uri,
  query,
  variables,
  pageInfoPath,
  dataPath,
  httpHeaders,
}) => {
  if (!fetch) {
    throw new Error(`No 'fetch' client available in current environment. Try using node-fetch`)
  }
  return () =>
    createIterator({
      executor: createExecutor({
        client: new ApolloClient({
          link: createHttpLink({ uri, fetch }),
          cache: new InMemoryCache(),
        }),
        variables,
        httpHeaders,
        query,
      }),
      pageInfoPath,
      dataPath,
    })
}
