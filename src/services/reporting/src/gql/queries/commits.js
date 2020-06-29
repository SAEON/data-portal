import gql from 'graphql-tag'

export default gql`
  query($owner: String!, $name: String!, $since: GitTimestamp!, $after: String) {
    repository(owner: $owner, name: $name) {
      ref(qualifiedName: "master") {
        target {
          ... on Commit {
            history(first: 100, since: $since, after: $after) {
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

/*
{
  repository(owner: "SAEONData", name: "saeon-atlas") {
    ref(qualifiedName: "master") {
      target {
        ... on Commit {
          history(
            first: 100
            since: "2020-04-10T00:00:00"
            after: "95fb6ca9d69df5fd09c024153a7d70b6100c0530 99"
          ) {
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
*/
