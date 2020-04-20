import fetch from 'node-fetch'
import { createHttpLink } from 'apollo-link-http'
import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ACCESS_TOKEN } from './config'
import gql from 'graphql-tag'

const client = new ApolloClient({
  link: createHttpLink({ uri: 'https://api.github.com/graphql', fetch }),
  cache: new InMemoryCache(),
})

const query = gql`
  {
    repository(owner: "SAEONData", name: "saeon-atlas") {
      ref(qualifiedName: "master") {
        target {
          ... on Commit {
            history(first: 100, since: "2020-04-10T00:00:00") {
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

;(async () => {
  const result = await client.query({
    query,
    context: {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    },
  })

  console.log(JSON.stringify(result))
})()
