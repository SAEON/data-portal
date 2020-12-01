import '@saeon/logger'
import fetch from 'node-fetch'
import gqlIterator from '../../../packages/graphql-iterator/src/index.js'
import query from './lib/commits-query.js'
import createFileWriter from './lib/file-writer.js'
import parse from 'date-fns/parse/index.js'
import {
  GITHUB_ACCESS_TOKEN,
  GQL_ENDPOINT,
  REPOSITORY_BRANCH,
  REPOSITORY_NAME,
  REPOSITORY_OWNER,
  SINCE as _SINCE,
} from './config.js'

/**
 * The filewriter expects that it will be passed an array of edges
 * as returned from the GitHub GraphQL API
 */
const { writeToFile, setIncludeHeaderRow } = createFileWriter()

const SINCE = parse(_SINCE, 'yyyy/MM/dd', new Date())
console.log('Fetching Git commits since', SINCE)

/**
 * Create a GQL client iterator
 */
let iterator = await gqlIterator({
  fetch,
  query,
  gqlEndpoint: GQL_ENDPOINT,
  httpHeaders: {
    Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`,
  },
  variables: {
    owner: REPOSITORY_OWNER,
    name: REPOSITORY_NAME,
    since: SINCE,
    after: undefined,
    qualifiedName: REPOSITORY_BRANCH,
  },
  pageInfoPath: 'repository.ref.target.history.pageInfo',
  dataPath: 'repository.ref.target.history.edges',
})()

/**
 * Iterate over results
 */
while (!iterator.done) {
  console.log(`Writing ${iterator.data.length} results to file`)
  writeToFile({
    data: iterator.data,
    filter: ({ message }) => {
      return message.length > 10
    },
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
