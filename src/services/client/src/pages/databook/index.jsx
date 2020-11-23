import DatabookContextProvider from './context'
import { gql } from '@apollo/client'
import { WithGqlQuery, setShareLink } from '../../hooks'
import LoadingDatabook from './loading'
import Loading from '../../components/loading'
import PostgisDataExplorer from './postgis'
import { CATALOGUE_CLIENT_ADDRESS } from '../../config'
import useStyles from './style'
import clsx from 'clsx'

const POLLING_INTERVAL = 1000

/**
 * Get the Mongo doc describing the databook
 * Keep polling until all the tables are ready
 */
export default ({ id }) => {
  const classes = useStyles()
  setShareLink({
    uri: `${CATALOGUE_CLIENT_ADDRESS}/render/databook?id=${id}`,
    params: false,
  })
  return (
    <WithGqlQuery
      QUERY={gql`
        query($id: ID!) {
          databook(id: $id) {
            id
            doc
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

        const { doc: databook } = data.databook
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
          <div
            className={clsx(
              classes.layout,
              {
                [classes.pushDown]: !window.location.pathname.includes('/render'),
              },
              classes.bg
            )}
          >
            <DatabookContextProvider databook={data.databook}>
              <PostgisDataExplorer />
            </DatabookContextProvider>
          </div>
        ) : (
          <LoadingDatabook tables={tables} tablesReady={tablesReady} />
        )
      }}
    </WithGqlQuery>
  )
}
