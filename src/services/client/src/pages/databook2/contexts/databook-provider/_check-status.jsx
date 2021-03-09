import { gql, useQuery } from '@apollo/client'
import Loading from '../../../../components/loading'
import LoadingDatabook from './_loading'

const POLLING_INTERVAL = 1000

export default ({ children, id }) => {
  const { error, loading, data, startPolling, stopPolling } = useQuery(
    gql`
      query($id: ID!) {
        databook(id: $id) {
          id
          doc
        }
      }
    `,
    {
      variables: {
        id,
      },
    }
  )

  if (loading) {
    return <Loading />
  }

  if (error) {
    throw new Error(`Error loading databook ${id}. ${error}`)
  }

  const { doc: databook } = data.databook
  const { tables } = databook

  let tablesReady = 0
  let tablesNotReady = 0
  let errors = []
  Object.entries(tables).forEach(([tableName, { ready, error }]) => {
    if (ready) {
      tablesReady++
    } else {
      if (error) {
        errors.push({ tableName, error })
      } else {
        tablesNotReady++
      }
    }
  })

  const ready = tablesNotReady > 0 ? false : true

  /**
   * Get the Mongo doc describing the databook
   * Keep polling until all the tables are ready
   */
  if (ready) {
    stopPolling()
  } else {
    startPolling(POLLING_INTERVAL)
  }

  if (!ready) {
    return <LoadingDatabook tables={tables} tablesReady={tablesReady} />
  }

  return children({ errors, databook })
}
