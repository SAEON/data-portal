import { createContext } from 'react'
import { gql, useQuery } from '@apollo/client'
import Loading from '../../../../components/loading'

export const context = createContext()

export default ({ children }) => {
  const { error, loading, data } = useQuery(
    gql`
      query (
        $type: LogType
        $monthBucket: DateBucket
        $yearBucket: DateBucket
        $sortByDate: SortConfig
        $sortByCount: SortConfig
        $referrerLimit: Int
        $locationCountLimit: Int
        $doiCountLimit: Int
        $limit: Int
      ) {
        downloadsCount: logs(type: $type, limit: $limit) {
          date(bucket: $yearBucket)
          count
        }

        downloadsByDate: logs(type: $type, sort: $sortByDate, limit: $limit) {
          date(bucket: $monthBucket)
          count
        }

        ipLatLonCount: logs(type: $type, sort: $sortByCount, limit: $limit) {
          createdAt
          clientIpLat
          clientIpLon
        }

        ipLocationCount: logs(type: $type, sort: $sortByCount, limit: $locationCountLimit) {
          clientIpLocation
          date(bucket: $yearBucket)
          count
        }

        doiCount: logs(type: $type, sort: $sortByCount, limit: $doiCountLimit) {
          doi
          date(bucket: $yearBucket)
          count
        }

        referrerCount: logs(type: $type, sort: $sortByCount, limit: $referrerLimit) {
          referrer
          date(bucket: $yearBucket)
          count
        }
      }
    `,
    {
      variables: {
        doiCountLimit: 100,
        limit: 1000,
        locationCountLimit: 25,
        monthBucket: 'month',
        referrerLimit: 25,
        sortByCount: {
          dimension: 'count',
          direction: 'DESC',
        },
        sortByDate: {
          dimension: 'date',
          direction: 'ASC',
        },
        type: 'download',
        yearBucket: 'year',
      },
      fetchPolicy: 'no-cache',
    }
  )

  if (loading) {
    return <Loading withHeight sx={{ position: 'relative' }} />
  }

  if (error) {
    throw new Error(`Error retrieving download report data: ${error?.message.truncate(1000)}`)
  }

  const {
    downloadsByDate,
    ipLatLonCount,
    referrerCount,
    ipLocationCount,
    doiCount,
    downloadsCount,
  } = data

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
