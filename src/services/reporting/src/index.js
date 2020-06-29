import '@saeon/logger'
import fetch from 'node-fetch'
import apolloHttpLink from 'apollo-link-http'
import apolloClient from 'apollo-client'
import apolloCache from 'apollo-cache-inmemory'
import configureGql, { commits } from './gql/index.js'
import stringify from 'csv-stringify'
import { createWriteStream, unlinkSync } from 'fs'
import format from 'date-fns/format/index.js'
import parse from 'date-fns/parse/index.js'
import {
  GQL_ENDPOINT,
  OUTPUT_FILEPATH,
  REPOSITORY_NAME,
  REPOSITORY_OWNER,
  SINCE,
} from './config.js'

const { createHttpLink } = apolloHttpLink
const { InMemoryCache } = apolloCache
const { ApolloClient } = apolloClient

try {
  console.log(`Deleting ${OUTPUT_FILEPATH}`)
  unlinkSync(OUTPUT_FILEPATH)
} catch (error) {
  if (error.code !== 'ENOENT') {
    console.error(error)
    process.exit(1)
  }
}
const stream = createWriteStream(OUTPUT_FILEPATH)

const exec = configureGql(
  new ApolloClient({
    link: createHttpLink({ uri: GQL_ENDPOINT, fetch }),
    cache: new InMemoryCache(),
  })
)

;(async () => {
  console.log('Fetching repository data', 'since', SINCE)
  const results = (
    await exec({
      variables: {
        owner: REPOSITORY_OWNER,
        name: REPOSITORY_NAME,
        since: parse(SINCE, 'yyyy/MM/dd', new Date()),
      },
      query: commits,
    })
  ).data.repository.ref.target.history.edges
    .map(({ node }) => node)
    .filter(({ message }) => Boolean(message.match(/#\d*/)))
    .map(row =>
      Object.assign(row, {
        'issue#': row.message.match(/#\d*/)[0],
      })
    )

  console.log('Found results:', results.length)

  stringify(results, {
    header: true,
    delimiter: ',',
    quoted: true,
    quoted_empty: true,
    quote: '"',
    escape: '\n',
    cast: {
      string: (value, { column }) => {
        if (column === 'committer.date') {
          return format(new Date(value), 'yyyy-MM-dd')
        }
        return value
      },
    },
    columns: [
      {
        key: 'committer.date',
      },
      'committer.name',
      'oid',
      'changedFiles',
      'deletions',
      'commitUrl',
      'message',
      'issue#',
    ],
  })
    .pipe(stream)
    .on('close', () => console.log(`Finished writing repository data to ${OUTPUT_FILEPATH}`))
})().catch(err => console.log('Top level error caught', err))
