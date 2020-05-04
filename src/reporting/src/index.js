import fetch from 'node-fetch'
import { createHttpLink } from 'apollo-link-http'
import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import configureGql, { commits } from './gql'
import stringify from 'csv-stringify'
import { createWriteStream, unlinkSync } from 'fs'
import { GQL_ENDPOINT, OUTPUT_FILEPATH, REPOSITORY_NAME, REPOSITORY_OWNER, SINCE } from './config'

try {
  unlinkSync(OUTPUT_FILEPATH)
} catch (error) {
  console.log(error)
}
const stream = createWriteStream(OUTPUT_FILEPATH)

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
        owner: REPOSITORY_OWNER,
        name: REPOSITORY_NAME,
        since: SINCE,
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
