TODO. this is how to use the iterator.

```js
import fetch from 'node-fetch'
import gql from 'graphql-tag'
import gqlIterator from '../../../../packages/gql-client-iterator/src/index.js'
import jsBase64 from 'js-base64'
import { DATACITE_USERNAME, DATACITE_PASSWORD } from '../config.js'

const { encode } = jsBase64

const REPOSITORY_ID = 'NRF.SAEON'
const LOAD_BATCH_SIZE = 1
const DATACITE_GQL_ENDPOINT = 'https://api.datacite.org/graphql'

const query = gql`
  query($id: ID!, $after: String, $first: Int) {
    repository(id: $id) {
      datasets(first: $first, after: $after) {
        pageInfo {
          endCursor
          hasNextPage
        }
        edges {
          node {
            doi
            url
          }
        }
      }
    }
  }
`

const createIterator = gqlIterator({
  fetch,
  query,
  gqlEndpoint: DATACITE_GQL_ENDPOINT,
  variables: {
    id: REPOSITORY_ID,
    first: LOAD_BATCH_SIZE,
  },
  pageInfoPath: 'repository.datasets.pageInfo',
  dataPath: 'repository.datasets.edges',
})

let iterator = await createIterator()

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

  /**
   * For now, just log the results
   */
  console.log(dois, result)

  iterator = await iterator.next()
}
```