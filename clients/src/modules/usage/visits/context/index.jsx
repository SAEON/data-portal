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
        $monthBucket: DateBucket
        $yearBucket: DateBucket
        $sortByDate: SortConfig
        $sortByCount: SortConfig
        $locationCountLimit: Int
        $pathnameCountLimit: Int
        $limit: Int
      ) {
        visitsByDate: logs(type: $type, sort: $sortByDate) {
          date(bucket: $monthBucket)
          count
        }

        ipLatLonCount: logs(type: $type, sort: $sortByCount) {
          createdAt
          clientIpLat
          clientIpLon
        }

        visitsCount: logs(type: $type) {
          date(bucket: $yearBucket)
          count
        }

        ipLocationCount: logs(type: $type, sort: $sortByCount, limit: $locationCountLimit) {
          clientIpLocation
          date(bucket: $yearBucket)
          count
        }

        pathnameCount: logs(type: $type, sort: $sortByCount, limit: $pathnameCountLimit) {
          clientPathname
          date(bucket: $yearBucket)
          count
        }

        referrerCount: logs(type: $type, sort: $sortByCount, limit: $limit) {
          referrer
          date(bucket: $yearBucket)
          count
        }
      }
    `,
    {
      variables: {
        type: 'appRender',
        monthBucket: 'month',
        yearBucket: 'year',
        locationCountLimit: 25,
        pathnameCountLimit: 100,
        limit: 25,
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

  if (loading) {
    return <Loading withHeight sx={{ position: 'relative' }} />
  }

  if (error) {
    throw new Error(`Error retrieving visits report data: ${error?.message.truncate(1000)}`)
  }

  const {
    visitsByDate,
    ipLatLonCount,
    visitsCount,
    referrerCount,
    ipLocationCount,
    pathnameCount,
  } = data

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
