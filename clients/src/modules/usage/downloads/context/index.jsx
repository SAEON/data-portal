import { createContext } from 'react'
import { gql, useQuery } from '@apollo/client'
import Loading from '../../../../components/loading'

export const context = createContext()

export default ({ children }) => {
  /**
   * There is an inconsistency in how
   * the apollo client handles field
   * arguments. The queries are split
   * into two groups:
   *
   * (1) Aggregated date by month
   * (2) Aggregated date by year
   */
  const { error, loading, data } = useQuery(
    gql`
      query (
        $type: LogType
        $bucket: DateBucket
        $sortByDate: SortConfig
        $sortByCount: SortConfig
        $limit: Int
      ) {
        downloadsByDate: logs(type: $type, sort: $sortByDate, limit: $limit) {
          date(bucket: $bucket)
          count
        }

        ipLatLonCount: logs(type: $type, sort: $sortByCount, limit: $limit) {
          createdAt
          clientIpLat
          clientIpLon
        }
      }
    `,
    {
      variables: {
        type: 'download',
        bucket: 'month',
        limit: 1000,
        sortByCount: {
          dimension: 'count',
          direction: 'DESC',
        },
        sortByDate: {
          dimension: 'date',
          direction: 'ASC',
        },
      },
      fetchPolicy: 'no-cache',
    }
  )

  const {
    error: error2,
    loading: loading2,
    data: data2,
  } = useQuery(
    gql`
      query (
        $type: LogType
        $bucket: DateBucket
        $sortByCount: SortConfig
        $referrerLimit: Int
        $limit: Int
        $locationCountLimit: Int
        $doiCountLimit: Int
      ) {
        downloadsCount: logs(type: $type, limit: $limit) {
          date(bucket: $bucket)
          count
        }

        ipLocationCount: logs(type: $type, sort: $sortByCount, limit: $locationCountLimit) {
          clientIpLocation
          date(bucket: $bucket)
          count
        }

        doiCount: logs(type: $type, sort: $sortByCount, limit: $doiCountLimit) {
          doi
          date(bucket: $bucket)
          count
        }

        referrerCount: logs(type: $type, sort: $sortByCount, limit: $referrerLimit) {
          referrer
          date(bucket: $bucket)
          count
        }
      }
    `,
    {
      variables: {
        type: 'download',
        bucket: 'year',
        limit: 1000,
        locationCountLimit: 25,
        doiCountLimit: 100,
        referrerLimit: 25,
        sortByCount: {
          dimension: 'count',
          direction: 'DESC',
        },
      },
      fetchPolicy: 'no-cache',
    }
  )

  if (loading || loading2) {
    return <Loading withHeight sx={{ position: 'relative' }} />
  }

  if (error || error2) {
    throw new Error(
      `Error retrieving download report data: ${error?.message.truncate(
        1000
      )} or ${error?.message.truncate(1000)}`
    )
  }

  const { downloadsByDate, ipLatLonCount } = data

  const { referrerCount, ipLocationCount, doiCount, downloadsCount } = data2

  return (
    <context.Provider
      value={{
        downloadsCount,
        downloadsByDate,
        referrerCount,
        ipLocationCount,
        ipLatLonCount,
        doiCount,
      }}
    >
      {children}
    </context.Provider>
  )
}
