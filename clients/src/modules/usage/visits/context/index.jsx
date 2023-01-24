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
      ) {
        visitsByDate: logs(type: $type, sort: $sortByDate) {
          date(bucket: $bucket)
          count
        }

        ipLatLonCount: logs(type: $type, sort: $sortByCount) {
          createdAt
          clientIpLat
          clientIpLon
        }
      }
    `,
    {
      variables: {
        type: 'appRender',
        bucket: 'month',
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
        $limit: Int
        $locationCountLimit: Int
        $pathnameCountLimit: Int
      ) {
        visitsCount: logs(type: $type) {
          date(bucket: $bucket)
          count
        }

        ipLocationCount: logs(type: $type, sort: $sortByCount, limit: $locationCountLimit) {
          clientIpLocation
          date(bucket: $bucket)
          count
        }

        pathnameCount: logs(type: $type, sort: $sortByCount, limit: $pathnameCountLimit) {
          clientPathname
          date(bucket: $bucket)
          count
        }

        referrerCount: logs(type: $type, sort: $sortByCount, limit: $limit) {
          referrer
          date(bucket: $bucket)
          count
        }
      }
    `,
    {
      variables: {
        type: 'appRender',
        bucket: 'year',
        locationCountLimit: 25,
        pathnameCountLimit: 100,
        limit: 25,
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
      `Error retrieving visits report data: ${error?.message.truncate(
        1000
      )} or ${error?.message.truncate(1000)}`
    )
  }

  const { visitsByDate, ipLatLonCount } = data

  const { visitsCount, referrerCount, ipLocationCount, pathnameCount } = data2

  return (
    <context.Provider
      value={{
        visitsCount,
        visitsByDate,
        referrerCount,
        ipLocationCount,
        ipLatLonCount,
        pathnameCount,
      }}
    >
      {children}
    </context.Provider>
  )
}
