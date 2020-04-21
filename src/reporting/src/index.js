import fetch from 'node-fetch'
import { createHttpLink } from 'apollo-link-http'
import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { GQL_ENDPOINT, FILEPATH } from './config'
import configureGql, { commits } from './gql'
import stringify from 'csv-stringify'
import { createWriteStream, unlinkSync } from 'fs'

try {
  unlinkSync(FILEPATH)
} catch (error) {
  console.log(error)
}
const stream = createWriteStream(FILEPATH)

const exec = configureGql(
  new ApolloClient({
    link: createHttpLink({ uri: GQL_ENDPOINT, fetch }),
    cache: new InMemoryCache(),
  })
)

;(async () => {
  const result = (
    await exec({
      variables: {
        owner: 'SAEONData',
        name: 'saeon-atlas',
        since: '2020-04-01T00:00:00',
      },
      query: commits,
    })
  ).data.repository.ref.target.history.edges
    .map(({ node }) => node)
    .filter(({ message }) => message.length >= 30)

  stringify(result, {
    header: true,
    delimiter: ',',
    quoted: true,
    quoted_empty: true,
    quote: '"',
    escape: '\n',
    cast: {},
    columns: [
      'committer.date',
      'committer.name',
      'oid',
      'changedFiles',
      'deletions',
      'commitUrl',
      'message',
    ],
  }).pipe(stream)
})().catch((err) => console.log('Top level error caught', err))
