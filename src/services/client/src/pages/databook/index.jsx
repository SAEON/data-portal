import DatabookContextProvider from './context'
import { gql } from '@apollo/client'
import WithGqlQuery from '../../hooks/_with-gql-query'
import LoadingDatabook from './loading'
import Loading from '../../components/loading'
import PostgisDataExplorer from './postgis'

const POLLING_INTERVAL = 1000

/**
 * Get the Mongo doc describing the databook
 * Keep polling until all the tables are ready
 */
export default ({ id }) => (
  <WithGqlQuery
    QUERY={gql`
      query($id: ID!) {
        browserClient {
          databook(id: $id) {
            id
            doc
          }
        }
      }
    `}
    variables={{ id }}
  >
    {({ error, loading, data, startPolling, stopPolling }) => {
      if (error) {
        throw new Error(`Error loading databook ${id}. ${error}`)
      }

      if (loading) {
        return <Loading />
      }

      const { doc: databook } = data.browserClient.databook
      const { tables } = databook

      let tablesReady = 0
      let tablesNotReady = 0
      Object.entries(tables).forEach(([, { ready }]) => {
        if (ready) {
          tablesReady += 1
        } else {
          tablesNotReady += 1
        }
      })

      const ready = tablesNotReady > 0 ? false : true

      if (ready) {
        stopPolling()
      } else {
        startPolling(POLLING_INTERVAL)
      }

      return ready ? (
        <DatabookContextProvider databook={data.browserClient.databook}>
          <PostgisDataExplorer />
        </DatabookContextProvider>
      ) : (
        <LoadingDatabook tables={tables} tablesReady={tablesReady} />
      )
    }}
  </WithGqlQuery>
)
