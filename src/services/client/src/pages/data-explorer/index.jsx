import { gql } from '@apollo/client'
import WithGqlQuery from '../../hooks/_with-gql-query'
import Loading from '../../components/loading'

/**
 * TODO
 *  1. Request IDs of prepared datasets (done)
 *  2. Request schema's of these prepared datasets
 *  3. Subscribe to more dataset schemas (since they may take a while)
 *  4. Now the client can call the data?
 */

export default () => (
  <WithGqlQuery
    QUERY={gql`
      query($text: String, $size: Int) {
        catalogue {
          id
          records(text: $text, size: $size) {
            nodes {
              dataId
            }
          }
        }
      }
    `}
    variables={{
      text: 'rivers',
      size: 20,
    }}
  >
    {({ error, loading, data, subscribeToMore }) => {
      if (error) {
        throw error
      }

      if (loading) {
        return <Loading />
      }

      subscribeToMore({
        document: gql`
          subscription {
            dataReady
          }
        `,
        variables: {},
        updateQuery: (prev, { subscriptionData }) => {
          const dataId = subscriptionData.data.dataReady
          console.log('prev', prev)
          console.log('new ready', dataId)
        },
      })

      return JSON.stringify(data)
    }}
  </WithGqlQuery>
)
