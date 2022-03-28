import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import { PUBLIC_GQL_ADDRESS } from '../../config'
import mergeListByIds from './_merge-list-by-ids'

export default ({ children }) => (
  <ApolloProvider
    client={
      new ApolloClient({
        cache: new InMemoryCache({
          typePolicies: {
            Query: {
              fields: {
                lists: {
                  merge: mergeListByIds
                }
              }
            },
            User: {
              fields: {
                roles: {
                  merge: (existing, incoming) => incoming
                }
              }
            }
          }
        }),
        link: new HttpLink({
          uri: PUBLIC_GQL_ADDRESS,
          credentials: 'include'
        })
      })
    }
  >
    {children}
  </ApolloProvider>
)
