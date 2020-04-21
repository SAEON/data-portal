import gql from 'graphql-tag'

export default gql`
  query($owner: String!, $name: String!, $since: GitTimestamp!) {
    repository(owner: $owner, name: $name) {
      ref(qualifiedName: "master") {
        target {
          ... on Commit {
            history(first: 100, since: $since) {
              pageInfo {
                hasPreviousPage
                hasNextPage
                startCursor
                endCursor
              }
              edges {
                node {
                  id
                  oid
                  message
                  changedFiles
                  additions
                  deletions
                  commitUrl
                  committer {
                    name
                    date
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
