import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import { CATALOGUE_API_GQL_ADDRESS } from '../../config'
import mergeListByIds from './_merge-list-by-ids'

export default ({ children }) => (
  <ApolloProvider
    client={
      new ApolloClient({
        cache: new InMemoryCache({
          typePolicies: {
            Databook: {
              fields: {
                dashboards: {
                  merge: mergeListByIds,
                },
                charts: {
                  merge: mergeListByIds,
                },
                filters: {
                  merge: mergeListByIds,
                },
              },
            },
            Dashboard: {
              fields: {
                charts: {
                  merge: mergeListByIds,
                },
              },
            },
          },
        }),
        link: new HttpLink({
          uri: CATALOGUE_API_GQL_ADDRESS,
          credentials: 'include',
        }),
      })
    }
  >
    {children}
  </ApolloProvider>
)