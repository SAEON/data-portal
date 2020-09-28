import gql from 'graphql-tag'

export default gql`
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

/*
{
  repository(id: "NRF.SAEON") {
    datasets(
      first:1
      after: "MTUyMDQxODY2MjAwMCwxMC4xNTQ5My9zYXJ2YS5kd3MuMTAwMDAwMTQ"
    ) {
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
*/
